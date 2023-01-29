import React from 'react';
import { TextInput, Button, Group, Box, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';

type NewFormProps = {};

const NewForm: React.FC<NewFormProps> = () => {
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

  const handleSubmit = (email: string, password: string) => {
    console.log(email, password);
  };

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
          <Button type="submit">Sign Up</Button>
        </Group>
      </form>
    </Box>
  );
};
export default NewForm;
