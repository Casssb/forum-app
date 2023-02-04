import { ActionIcon, Box, Input, useMantineColorScheme } from '@mantine/core';
import { IconLink, IconPhoto } from '@tabler/icons-react';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import grayscaleLogo from '../../public/freddit-grayscale.png';
import { auth } from '../../firebase/firebaseConfig';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { setAuthModalOpen, setAuthModalView } from '../../redux/slices/authModalSlice';

const CreatePost: React.FC = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const router = useRouter();
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();

  const sendToNewPostPage = () => {
    if (!user) {
      dispatch(setAuthModalOpen(true));
      dispatch(setAuthModalView('existing'));
      return;
    }
    const { communityId } = router.query;
    router.push(`/f/${communityId}/submit`);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '1rem',
        gap: '0.6rem',
        border: '0.6px solid gray',
        borderRadius: '3px',
      }}
      bg={dark ? 'dark' : 'gray.0'}
    >
      <Image src={grayscaleLogo} height={40} width={40} alt="freddit logo (grayscale)" />
      <Input
        placeholder="Create Post"
        sx={{ flex: 1, cursor: 'pointer' }}
        onClick={() => sendToNewPostPage()}
      />
      <ActionIcon size="lg" variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 105 }}>
        <IconPhoto size={20} />
      </ActionIcon>
      <ActionIcon size="lg" variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 105 }}>
        <IconLink size={20} />
      </ActionIcon>
    </Box>
  );
};
export default CreatePost;
