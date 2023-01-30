import React from 'react';
import { TextInput, Button, Group, Box, PasswordInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebaseConfig';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { setAuthModalOpen } from '../../redux/slices/authModalSlice';

type NewFormProps = {};

const NewForm: React.FC<NewFormProps> = () => {
  const dispatch = useAppDispatch();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = (email: string, password: string) => {
    createUserWithEmailAndPassword(email, password);
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
        <PasswordInput
          required
          mt="sm"
          label="Confirm password"
          placeholder="Confirm password"
          {...form.getInputProps('confirmPassword')}
        />
        <Group position="left" mt="md">
          <Button loading={loading} type="submit">
            Sign Up
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
export default NewForm;
