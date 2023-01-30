import React from 'react';
import { TextInput, Button, Group, Box, PasswordInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebaseConfig';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { setAuthModalOpen } from '../../redux/slices/authModalSlice';

type ExistingFormProps = {};

const ExistingForm: React.FC<ExistingFormProps> = () => {
  const dispatch = useAppDispatch();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  const handleSubmit = (email: string, password: string) => {
    signInWithEmailAndPassword(email, password);
  };

  user && dispatch(setAuthModalOpen(false));

  return (
    <Box sx={{ maxWidth: 300 }}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values.email, values.password))}>
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          required
          mt="sm"
          label="Password"
          placeholder="Password"
          {...form.getInputProps('password')}
        />
        <Group position="left" mt="md">
          <Button loading={loading} type="submit">
            Log In
          </Button>
        </Group>
        {error && (
          <Text mt="1rem" color="red">
            {error.message}
          </Text>
        )}
      </form>
    </Box>
  );
};
export default ExistingForm;
