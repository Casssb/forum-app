import { Button, Group } from '@mantine/core';
import React from 'react';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { setModalOpen, setModalView } from '../../redux/slices/authModalSlice';

type AuthButtonsProps = {};

const AuthButtons: React.FC<AuthButtonsProps> = () => {
  const dispatch = useAppDispatch();
  return (
    <Group spacing={5} display={{ base: 'none', md: 'flex' }}>
      <Button
        color="grape.7"
        onClick={() => {
          dispatch(setModalOpen(true));
          dispatch(setModalView('signup'));
        }}
      >
        Sign Up
      </Button>
      <Button
        color="green.6"
        onClick={() => {
          dispatch(setModalOpen(true));
          dispatch(setModalView('login'));
        }}
      >
        Log In
      </Button>
    </Group>
  );
};
export default AuthButtons;
