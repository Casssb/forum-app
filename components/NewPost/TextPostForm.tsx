import { Box, Button, Divider, Group, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { User } from 'firebase/auth';
import { Timestamp, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React from 'react';
import { db } from '../../firebase/firebaseConfig';
import { Post } from '../../redux/slices/postsSlice';

interface TextPostFormProps {
  loading: boolean;
  setLoading: Function;
  user: User;
  communityId: string | undefined;
  communityImageURL?: string;
}

interface TextFormProps {
  title: string;
  body: string;
}

const TextPostForm: React.FC<TextPostFormProps> = ({
  loading,
  setLoading,
  user,
  communityId,
  communityImageURL,
}) => {
  const router = useRouter();
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
      creatorDisplayName: user.displayName ? user.displayName : user.email!.split('@')[0],
      communityId: communityId as string,
      title: values.title,
      body: values.body,
      totalComments: 0,
      numOfVotes: 0,
      createdAt: serverTimestamp() as Timestamp,
      communityImageURL: communityImageURL || '',
    };
    setLoading(true);

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const postDocRef = await addDoc(collection(db, 'posts'), newPost);
      router.back();
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
