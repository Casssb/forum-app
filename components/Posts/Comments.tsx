import { Box, Card, Text, useMantineColorScheme } from '@mantine/core';
import { User } from 'firebase/auth';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { Post } from '../../redux/slices/postsSlice';
import CommentForm, { Comment } from './CommentForm';
import SingleComment from './SingleComment';

interface CommentsProps {
  user?: User;
  selectedPost: Post;
  communityId: string;
}

const Comments: React.FC<CommentsProps> = ({ user, selectedPost, communityId }) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const getComments = async () => {
    setLoading(true);
    try {
      const commentsQuery = query(
        collection(db, 'comments'),
        where('postId', '==', selectedPost.id),
        orderBy('createdAt', 'desc')
      );
      const commentDocs = await getDocs(commentsQuery);
      const commentsArray = commentDocs.docs.map((com) => ({
        id: com.id,
        ...com.data(),
      }));
      setComments(commentsArray as Comment[]);
    } catch (error: any) {
      console.log('Firebase error getting comments', error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
        marginTop: '0.8rem',
        height: 'max-content',
      }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'start',
          gap: '0.6rem',
          height: '100%',
        }}
        p="xs"
        bg={dark ? 'dark' : 'gray.0'}
        withBorder
      >
        {user && (
          <Text>
            Comment as{' '}
            <Text span variant="gradient">
              {user.displayName}
            </Text>
          </Text>
        )}
        <CommentForm
          user={user}
          selectedPost={selectedPost}
          communityId={communityId}
          setComments={setComments}
        />
        {comments.map((comment) => (
          <SingleComment comment={comment} key={comment.id} userId={user?.uid} />
        ))}
      </Card>
    </Box>
  );
};
export default Comments;
