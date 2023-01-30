import { ActionIcon, Box, Divider, Flex, Text, Title } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import React from 'react';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { setAuthModalOpen, setAuthModalView } from '../../redux/slices/authModalSlice';
import NewForm from './NewForm';
import GoogleLogin from './GoogleLogin';

type NewUserProps = {};

const NewUser: React.FC<NewUserProps> = () => {
  const dispatch = useAppDispatch();
  return (
    <Flex direction="column">
      <Box display="flex" w="100%" sx={{ justifyContent: 'flex-end' }}>
        <ActionIcon>
          <IconX onClick={() => dispatch(setAuthModalOpen(false))} />
        </ActionIcon>
      </Box>
      <Box w="100%">
        <Title order={2}>Sign Up</Title>
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
      <NewForm />
      <Text mt="1rem">
        Already a Fredditor?{' '}
        <Text
          variant="gradient"
          span
          sx={{ cursor: 'pointer' }}
          onClick={() => dispatch(setAuthModalView('existing'))}
        >
          Log In
        </Text>
      </Text>
    </Flex>
  );
};
export default NewUser;
