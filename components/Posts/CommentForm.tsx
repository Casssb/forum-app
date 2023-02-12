import { Box, Button, Divider, Group, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { User } from 'firebase/auth';
import {
  Timestamp,
  collection,
  doc,
  increment,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { setAuthModalOpen, setAuthModalView } from '../../redux/slices/authModalSlice';
import { Post, incrementSelectedPostComments } from '../../redux/slices/postsSlice';

interface CommentFormProps {
  user?: User;
  selectedPost: Post;
  communityId: string;
  setComments: Dispatch<SetStateAction<Comment[]>>;
}

export interface Comment {
  id?: string;
  creator: string;
  creatorDisplayName: string;
  postId: string;
  postTitle: string;
  communityId: string;
  body: string;
  createdAt: Timestamp;
}

const CommentForm: React.FC<CommentFormProps> = ({
  user,
  selectedPost,
  communityId,
  setComments,
}) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      comment: '',
    },

    validate: {
      comment: (value) => (value.length > 10000 ? 'Too long (10k characters max)' : null),
    },
  });

  const handleSubmitComment = async (comment: string) => {
    if (user) {
      setLoading(true);
      try {
        const batch = writeBatch(db);
        const commentDocRef = doc(collection(db, 'comments'));
        const newComment: Comment = {
          id: commentDocRef.id,
          creator: user.uid,
          creatorDisplayName: user.displayName ? user.displayName : user.email!.split('@')[0],
          postId: selectedPost.id!,
          postTitle: selectedPost.title,
          communityId,
          body: comment,
          createdAt: serverTimestamp() as Timestamp,
        };
        batch.set(commentDocRef, newComment);
        newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;

        const postDocRef = doc(db, 'posts', selectedPost.id!);
        batch.update(postDocRef, {
          totalComments: increment(1),
        });

        await batch.commit();
        form.reset();
        setComments((prev) => [newComment, ...prev]);
        dispatch(incrementSelectedPostComments());
      } catch (error: any) {
        console.log('Firebase error creating comment', error.message);
      }
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <form onSubmit={form.onSubmit((values) => handleSubmitComment(values.comment))}>
        <Textarea
          mt="0.5rem"
          minRows={5}
          autosize
          placeholder="What are your thoughts?"
          {...form.getInputProps('comment')}
        />
        <Divider my="sm" />

        <Group position="right" mt="md">
          <Button
            variant="outline"
            loading={loading}
            type="submit"
            disabled={form.values.comment.length === 0}
            onClick={() => {
              if (!user) {
                dispatch(setAuthModalOpen(true));
                dispatch(setAuthModalView('existing'));
              }
            }}
          >
            Comment
          </Button>
        </Group>
      </form>
    </Box>
  );
};
export default CommentForm;
