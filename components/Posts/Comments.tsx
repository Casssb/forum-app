import { Box, Card, Skeleton, Text, useMantineColorScheme } from '@mantine/core';
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
  const [loadingComments, setLoadingComments] = useState(false);

  const getComments = async () => {
    setLoadingComments(true);
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
    setLoadingComments(false);
  };

  useEffect(() => {
    selectedPost && getComments();
  }, [selectedPost]);

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
        {loadingComments ? (
          <>
            {[0, 1, 2].map((elem) => (
              <Box sx={{ padding: '0.8rem', width: '100%' }} key={elem}>
                <Skeleton height={40} circle mb="xl" />
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
              </Box>
            ))}
          </>
        ) : (
          <>
            {comments.length ? (
              <>
                {comments.map((comment) => (
                  <SingleComment
                    comment={comment}
                    key={comment.id}
                    user={user}
                    selectedPost={selectedPost}
                    setComments={setComments}
                  />
                ))}
              </>
            ) : (
              <Text>No comments yet</Text>
            )}
          </>
        )}
      </Card>
    </Box>
  );
};
export default Comments;
