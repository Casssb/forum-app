import { Box, useMantineColorScheme } from '@mantine/core';
import React from 'react';
import NewPostButtons from './NewPostButtons';
import NewPostForm from './NewPostForm';

interface NewPostProps {}

const NewPost: React.FC<NewPostProps> = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <Box
      bg={dark ? 'dark' : 'gray.0'}
      sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
    >
      <NewPostButtons />
      <NewPostForm />
    </Box>
  );
};
export default NewPost;
