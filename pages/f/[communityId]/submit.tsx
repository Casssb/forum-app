import { Box, Container, Divider, Title } from '@mantine/core';
import React from 'react';
import NewPost from '../../../components/NewPost/NewPost';

type submitProps = {};

const submit: React.FC<submitProps> = () => {
  return (
    <Container size="xl" sx={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
      <Box sx={{ flex: '3' }}>
        <Title order={4}>Create a post</Title>
        <Divider my="sm" />
        <NewPost />
      </Box>
      <Box sx={{ border: '2px solid green', flex: '1' }}>2</Box>
    </Container>
  );
};
export default submit;
