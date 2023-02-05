import React from 'react';
import { TextInput, Button, Group, Box, Textarea, Divider } from '@mantine/core';
import { useForm } from '@mantine/form';

type TextPostFormProps = {};

const TextPostForm: React.FC<TextPostFormProps> = () => {
  const form = useForm({
    initialValues: {
      title: '',
      body: '',
    },

    validate: {
      title: (value) => (value.length < 3 ? 'Must be at least 3 characters' : null),
    },
  });
  return (
    <Box sx={{ width: '100%' }} p="1rem">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput required placeholder="Title" {...form.getInputProps('title')} />
        <Textarea
          mt="0.5rem"
          minRows={4}
          autosize
          placeholder="Text (optional)"
          {...form.getInputProps('body')}
        />
        <Divider my="sm" />

        <Group position="right" mt="md">
          <Button type="submit">Post</Button>
        </Group>
      </form>
    </Box>
  );
};
export default TextPostForm;
