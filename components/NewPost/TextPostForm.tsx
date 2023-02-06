import React from 'react';
import { TextInput, Button, Group, Box, Textarea, Divider } from '@mantine/core';
import { useForm } from '@mantine/form';
import { User } from 'firebase/auth';
import { Timestamp, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { Post } from '../../redux/slices/postsSlice';

interface TextPostFormProps {
  loading: boolean;
  setLoading: Function;
  user: User;
  communityId: string | undefined;
}

interface TextFormProps {
  title: string;
  body: string;
}

const TextPostForm: React.FC<TextPostFormProps> = ({ loading, setLoading, user, communityId }) => {
  const form = useForm({
    initialValues: {
      title: '',
      body: '',
    },

    validate: {
      title: (value) => (value.length < 3 ? 'Must be at least 3 characters' : null),
    },
  });

  const handleSubmitTextPost = async (values: TextFormProps) => {
    const newPost: Post = {
      creator: user.uid,
      creatorDisplayName: user.email!.split('@')[0],
      communityId: communityId as string,
      title: values.title,
      body: values.body,
      totalComments: 0,
      numOfVotes: 0,
      createdAt: serverTimestamp() as Timestamp,
    };
    setLoading(true);

    try {
      const postDocRef = await addDoc(collection(db, 'posts'), newPost);
    } catch (error: any) {
      console.log('firestore error', error.message);
    }
    setLoading(false);
  };
  return (
    <Box sx={{ width: '100%' }} p="1rem">
      <form onSubmit={form.onSubmit((values) => handleSubmitTextPost(values))}>
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
          <Button loading={loading} type="submit">
            Post
          </Button>
        </Group>
      </form>
    </Box>
  );
};
export default TextPostForm;
