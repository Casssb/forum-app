import { Box, Card, useMantineColorScheme } from '@mantine/core';
import { User } from 'firebase/auth';
import React, { useEffect } from 'react';
import { Post } from '../../redux/slices/postsSlice';

interface CommentsProps {
  user?: User;
  selectedPost: Post;
  communityId: string;
}

const Comments: React.FC<CommentsProps> = ({ user, selectedPost, communityId }) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const createComment = async (text: string) => {};
  const deleteComment = async (comment: any) => {};
  const getComments = async () => {};

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
          justifyContent: 'space-evenly',
          alignItems: 'center',
          gap: '0.6rem',
          height: '100%',
        }}
        p="xs"
        bg={dark ? 'dark' : 'gray.0'}
        withBorder
      >
        Comments
      </Card>
    </Box>
  );
};
export default Comments;
