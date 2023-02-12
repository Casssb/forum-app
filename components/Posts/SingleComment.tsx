import { ActionIcon, Box, Button, Card, Group, Stack, Text } from '@mantine/core';
import { User } from 'firebase/auth';
import { doc, increment, writeBatch } from 'firebase/firestore';
import moment from 'moment';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { db } from '../../firebase/firebaseConfig';
import fredditLogoGray from '../../public/freddit-grayscale.png';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { Post, decrementSelectedPostComments } from '../../redux/slices/postsSlice';
import { Comment } from './CommentForm';
import { IconArrowBigDown, IconArrowBigUp } from '@tabler/icons-react';

interface SingleCommentProps {
  user?: User;
  comment: Comment;
  setComments: Dispatch<SetStateAction<Comment[]>>;
  selectedPost: Post;
}

const SingleComment: React.FC<SingleCommentProps> = ({
  user,
  comment,
  selectedPost,
  setComments,
}) => {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const dispatch = useAppDispatch();

  const handleDeleteComment = async () => {
    setLoadingDelete(true);
    try {
      const batch = writeBatch(db);
      const commentDocRef = doc(db, 'comments', comment.id!);
      batch.delete(commentDocRef);

      const postDocRef = doc(db, 'posts', selectedPost.id!);
      batch.update(postDocRef, {
        totalComments: increment(-1),
      });
      await batch.commit();
      dispatch(decrementSelectedPostComments());
      setComments((prev) => prev.filter((com) => com.id !== comment.id));
    } catch (error: any) {
      console.log('Firebase error deleting comment', error.message);
    }
    setLoadingDelete(false);
  };
  return (
    <Card>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        <Box>
          <Image
            src={user?.photoURL ? user.photoURL : fredditLogoGray}
            alt="user badge"
            height={40}
            width={40}
          />
        </Box>
        <Stack spacing="xs">
          <Group spacing="xs">
            <Text fz="xs" fw="700">
              {comment.creatorDisplayName}
            </Text>
            <Text fz="xs">{moment(new Date(comment.createdAt.seconds * 1000)).fromNow()}</Text>
          </Group>
          <Text>{comment.body}</Text>
          <Group spacing="xs">
            <ActionIcon size="xs" variant="subtle" color="blue">
              <IconArrowBigUp size={12} />
            </ActionIcon>
            <ActionIcon size="xs" variant="subtle" color="blue">
              <IconArrowBigDown size={12} />
            </ActionIcon>
            {user?.uid === comment.creator && (
              <>
                <Button size="xs" variant="subtle">
                  Edit
                </Button>
                <Button
                  size="xs"
                  variant="subtle"
                  onClick={() => handleDeleteComment()}
                  loading={loadingDelete}
                >
                  Delete
                </Button>
              </>
            )}
          </Group>
        </Stack>
      </Box>
    </Card>
  );
};
export default SingleComment;
