import { Box, useMantineColorScheme } from '@mantine/core';
import { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import MediaPostForm from './MediaPostForm';
import NewPostButtons from './NewPostButtons';
import TextPostForm from './TextPostForm';

interface NewPostProps {
  user: User;
}

const NewPost: React.FC<NewPostProps> = ({ user }) => {
  const { viewState } = useAppSelector((state) => state.postForm);
  const [loading, setLoading] = useState(false);
  const { colorScheme } = useMantineColorScheme();
  const router = useRouter();
  const dark = colorScheme === 'dark';
  const { communityId } = router.query;
  const { currentCommunity } = useAppSelector((state) => state.community);

  return (
    <Box
      bg={dark ? 'dark' : 'gray.0'}
      sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
    >
      <NewPostButtons />
      {viewState === 'post' && (
        <TextPostForm
          loading={loading}
          user={user}
          communityId={communityId as string}
          setLoading={setLoading}
          communityImageURL={currentCommunity?.imageURL}
        />
      )}
      {viewState === 'media' && (
        <MediaPostForm
          loading={loading}
          user={user}
          communityId={communityId as string}
          setLoading={setLoading}
          communityImageURL={currentCommunity?.imageURL}
        />
      )}
    </Box>
  );
};
export default NewPost;
