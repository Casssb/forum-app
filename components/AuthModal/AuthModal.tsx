import React from 'react';
import { Modal, Title } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { setModalOpen } from '../../redux/slices/authModalSlice';

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const { isModalOpen } = useAppSelector((state) => state.authModal);
  const { viewState } = useAppSelector((state) => state.authModal);
  const dispatch = useAppDispatch();
  return (
    <>
      <Modal
        opened={isModalOpen}
        onClose={() => dispatch(setModalOpen(false))}
        title="Introduce yourself!"
      >
        {viewState === 'login' && <Title>Log In</Title>}
        {viewState === 'signup' && <Title>Sign Up</Title>}
      </Modal>
    </>
  );
};
export default AuthModal;
