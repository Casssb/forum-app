import { Box, useMantineColorScheme } from '@mantine/core';
import React from 'react';
import NewPostButtons from './NewPostButtons';

interface NewPostFormProps {}

const NewPostForm: React.FC<NewPostFormProps> = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <Box
      bg={dark ? 'dark' : 'gray.0'}
      sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
    >
      <NewPostButtons />
    </Box>
  );
};
export default NewPostForm;
