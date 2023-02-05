import { Box, useMantineColorScheme } from '@mantine/core';
import React from 'react';
import NewPostButtons from './NewPostButtons';
import TextPostForm from './TextPostForm';
import { useAppSelector } from '../../redux/hooks/hooks';
import MediaPostForm from './MediaPostForm';

interface NewPostProps {}

const NewPost: React.FC<NewPostProps> = () => {
  const { viewState } = useAppSelector((state) => state.postForm);
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <Box
      bg={dark ? 'dark' : 'gray.0'}
      sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
    >
      <NewPostButtons />
      {viewState === 'post' && <TextPostForm />}
      {viewState === 'media' && <MediaPostForm />}
    </Box>
  );
};
export default NewPost;
