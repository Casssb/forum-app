import { Box, Button, Text } from '@mantine/core';
import React from 'react';
import { IconBrandGoogle } from '@tabler/icons-react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebaseConfig';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { setAuthModalOpen } from '../../redux/slices/authModalSlice';

type GoogleLoginProps = {};

const GoogleLogin: React.FC<GoogleLoginProps> = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const dispatch = useAppDispatch();
  user && dispatch(setAuthModalOpen(false));
  return (
    <Box my="1rem">
      <Button
        leftIcon={<IconBrandGoogle size={20} />}
        loading={loading}
        onClick={() => signInWithGoogle()}
      >
        Continue with Google
      </Button>
      {error && <Text color="red">{error.message}</Text>}
    </Box>
  );
};
export default GoogleLogin;
