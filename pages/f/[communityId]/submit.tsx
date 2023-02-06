import { Box, Container, Divider, Title } from '@mantine/core';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import NewPost from '../../../components/NewPost/NewPost';
import { auth } from '../../../firebase/firebaseConfig';

type submitProps = {};

const submit: React.FC<submitProps> = () => {
  const [user] = useAuthState(auth);
  return (
    <Container size="xl" sx={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
      <Box sx={{ flex: '3' }}>
        <Title order={4}>Create a post</Title>
        <Divider my="sm" />
        {user && <NewPost user={user} />}
      </Box>
      <Box sx={{ border: '2px solid green', flex: '1' }}>2</Box>
    </Container>
  );
};
export default submit;
