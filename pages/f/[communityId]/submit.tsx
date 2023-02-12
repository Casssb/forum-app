import { Box, Container, Divider, Title } from '@mantine/core';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import About from '../../../components/Community/About';
import NewPost from '../../../components/NewPost/NewPost';
import { auth } from '../../../firebase/firebaseConfig';
import useCommunityInfo from '../../../hooks/useCommunityInfo';

type submitProps = {};

const submit: React.FC<submitProps> = () => {
  const [user] = useAuthState(auth);
  const { currentCommunity } = useCommunityInfo();
  return (
    <Container size="xl" sx={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
      <Box sx={{ flex: '3' }}>
        <Title order={4}>Create a post</Title>
        <Divider my="sm" />
        {user && <NewPost user={user} />}
      </Box>
      <Box sx={{ flex: '1' }}>
        {currentCommunity && <About currentCommunity={currentCommunity} />}
      </Box>
    </Container>
  );
};
export default submit;
