import React from 'react';
import { Box, Flex, Modal } from '@mantine/core';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { setAuthModalOpen } from '../../redux/slices/authModalSlice';
import ExistingUser from './ExistingUser';
import NewUser from './NewUser';
import frogCity from '../../public/frog-city-watercolour3.png';

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const { isModalOpen } = useAppSelector((state) => state.authModal);
  const { viewState } = useAppSelector((state) => state.authModal);
  const dispatch = useAppDispatch();
  return (
    <>
      <Modal
        size="auto"
        opened={isModalOpen}
        onClose={() => dispatch(setAuthModalOpen(false))}
        padding={0}
        withCloseButton={false}
      >
        <Flex>
          <Box sx={{ flex: '2', position: 'relative' }}>
            <Image
              src={frogCity}
              fill
              alt="watercolour frog in city"
              style={{ objectFit: 'cover', objectPosition: 'bottom' }}
            />
          </Box>
          <Box sx={{ flex: '5' }} p="1rem" h={700}>
            {viewState === 'existing' ? <ExistingUser /> : <NewUser />}
          </Box>
        </Flex>
      </Modal>
    </>
  );
};
export default AuthModal;
