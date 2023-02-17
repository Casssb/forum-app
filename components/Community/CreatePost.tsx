import { ActionIcon, Input, Paper, Tooltip, useMantineColorScheme } from '@mantine/core';
import { IconLink, IconPhoto } from '@tabler/icons-react';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import grayscaleLogo from '../../public/freddit-grayscale.png';
import { auth } from '../../firebase/firebaseConfig';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { setAuthModalOpen, setAuthModalView } from '../../redux/slices/authModalSlice';
import { setpostFormView } from '../../redux/slices/postFormSlice';

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
    } else {
      console.log(user);
      const { communityId } = router.query;
      router.push(`/f/${communityId}/submit`);
    }
  };
  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: '0.6rem',
        marginBottom: '0.8rem',
      }}
      bg={dark ? 'dark' : 'gray.0'}
      p="sm"
      withBorder
    >
      <Image src={grayscaleLogo} height={40} width={40} alt="freddit logo (grayscale)" />
      <Input
        placeholder="Create Post"
        sx={{ flex: 1, cursor: 'pointer' }}
        onClick={() => {
          sendToNewPostPage();
          dispatch(setpostFormView('post'));
        }}
      />
      <Tooltip label="Create Media Post">
        <ActionIcon
          size="lg"
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan', deg: 105 }}
          onClick={() => {
            sendToNewPostPage();
            dispatch(setpostFormView('media'));
          }}
        >
          <IconPhoto size={20} />
        </ActionIcon>
      </Tooltip>
      <ActionIcon
        size="lg"
        variant="gradient"
        gradient={{ from: 'indigo', to: 'cyan', deg: 105 }}
        onClick={() => {
          sendToNewPostPage();
          dispatch(setpostFormView('link'));
        }}
      >
        <IconLink size={20} />
      </ActionIcon>
    </Paper>
  );
};
export default CreatePost;
