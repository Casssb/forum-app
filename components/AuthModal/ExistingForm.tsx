import React from 'react';
import { TextInput, Button, Group, Box, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';

type ExistingFormProps = {};

const ExistingForm: React.FC<ExistingFormProps> = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  return (
    <Box sx={{ maxWidth: 300 }}>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
          <Button type="submit">Log In</Button>
        </Group>
      </form>
    </Box>
  );
};
export default ExistingForm;
