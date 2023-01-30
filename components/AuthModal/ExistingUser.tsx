import { ActionIcon, Box, Divider, Flex, Text, Title } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import React from 'react';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { setAuthModalOpen, setAuthModalView } from '../../redux/slices/authModalSlice';
import ExistingForm from './ExistingForm';
import GoogleLogin from './GoogleLogin';

type ExistingUserProps = {};

const ExistingUser: React.FC<ExistingUserProps> = () => {
  const dispatch = useAppDispatch();
  return (
    <Flex direction="column">
      <Box display="flex" w="100%" sx={{ justifyContent: 'flex-end' }}>
        <ActionIcon>
          <IconX onClick={() => dispatch(setAuthModalOpen(false))} />
        </ActionIcon>
      </Box>
      <Box w="100%">
        <Title order={2}>Log In</Title>
        <Text>
          By continuing you agree to our{' '}
          <Text variant="gradient" span>
            User Agreement
          </Text>{' '}
          and{' '}
          <Text variant="gradient" span>
            Privacy Policy
          </Text>
        </Text>
      </Box>
      <GoogleLogin />
      <Divider label="OR" labelPosition="center" />
      <ExistingForm />
      <Text mt="1rem">
        New to Freddit?{' '}
        <Text
          variant="gradient"
          span
          sx={{ cursor: 'pointer' }}
          onClick={() => dispatch(setAuthModalView('new'))}
        >
          Sign Up
        </Text>
      </Text>
    </Flex>
  );
};
export default ExistingUser;
