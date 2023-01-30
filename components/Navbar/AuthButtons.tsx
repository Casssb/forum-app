import { Button, Group, useMantineColorScheme } from '@mantine/core';
import React from 'react';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { setAuthModalOpen, setAuthModalView } from '../../redux/slices/authModalSlice';

type AuthButtonsProps = {};

const AuthButtons: React.FC<AuthButtonsProps> = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const dispatch = useAppDispatch();
  return (
    <Group spacing={5} display={{ base: 'none', md: 'flex' }}>
      <Button
        variant="outline"
        color={dark ? 'gray' : 'indigo.6'}
        onClick={() => {
          dispatch(setAuthModalOpen(true));
          dispatch(setAuthModalView('new'));
        }}
      >
        Sign Up
      </Button>
      <Button
        variant="filled"
        color={dark ? 'gray' : 'indigo.6'}
        onClick={() => {
          dispatch(setAuthModalOpen(true));
          dispatch(setAuthModalView('existing'));
        }}
      >
        Log In
      </Button>
    </Group>
  );
};
export default AuthButtons;
