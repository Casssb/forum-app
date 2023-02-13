import { Box, Button, Divider, Group, Text, TextInput, useMantineTheme } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { User } from 'firebase/auth';
import { Timestamp, addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { db, storage } from '../../firebase/firebaseConfig';
import { Post } from '../../redux/slices/postsSlice';

interface MediaPostFormProps {
  loading: boolean;
  setLoading: Function;
  user: User;
  communityId: string | undefined;
  communityImageURL?: string;
}

interface MediaFormProps {
  title: string;
}

const MediaPostForm: React.FC<MediaPostFormProps> = ({
  loading,
  setLoading,
  user,
  communityId,
  communityImageURL,
}) => {
  const theme = useMantineTheme();
  const router = useRouter();
  const [files, setFiles] = useState<FileWithPath[] | null>(null);
  const form = useForm({
    initialValues: {
      title: '',
    },

    validate: {
      title: (value) => (value.length < 3 ? 'Must be at least 3 characters' : null),
    },
  });

  const handleSubmitMediaPost = async (values: MediaFormProps) => {
    const newPost: Post = {
      creator: user.uid,
      creatorDisplayName: user.displayName ? user.displayName : user.email!.split('@')[0],
      communityId: communityId as string,
      title: values.title,
      totalComments: 0,
      numOfVotes: 0,
      createdAt: serverTimestamp() as Timestamp,
      communityImageURL: communityImageURL || '',
    };
    setLoading(true);

    try {
      const postDocRef = await addDoc(collection(db, 'posts'), newPost);
      const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
      await uploadBytes(imageRef, files![0]);
      const imageDownloadURL = await getDownloadURL(imageRef);
      await updateDoc(postDocRef, {
        imageURL: imageDownloadURL,
      });
      router.back();
    } catch (error: any) {
      console.log('firestore error', error.message);
    }
    setLoading(false);
  };

  const createImagePreview = () => {
    return files!.map((file, index) => {
      const imageUrl = URL.createObjectURL(file);
      return <Image key={index} src={imageUrl} height={200} width={400} alt="image uploaded" />;
    });
  };

  return (
    <Box sx={{ width: '100%' }} p="1rem">
      <form onSubmit={form.onSubmit((values) => handleSubmitMediaPost(values))}>
        <TextInput required placeholder="Title" {...form.getInputProps('title')} />
        {files?.length ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            mt="0.5rem"
          >
            {createImagePreview()}
            <Button color="red" onClick={() => setFiles(null)}>
              Remove file
            </Button>
          </Box>
        ) : (
          <Box mt="0.5rem">
            <Dropzone
              accept={IMAGE_MIME_TYPE}
              onDrop={setFiles}
              maxSize={3 * 1024 ** 2}
              maxFiles={1}
            >
              <Group
                position="center"
                spacing="xl"
                style={{ minHeight: 220, pointerEvents: 'none' }}
              >
                <Dropzone.Accept>
                  <IconUpload
                    size={50}
                    stroke={1.5}
                    color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    size={50}
                    stroke={1.5}
                    color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto size={50} stroke={1.5} />
                </Dropzone.Idle>

                <div>
                  <Text size="xl" inline>
                    Drag images here or click to select files
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not exceed 5mb
                  </Text>
                </div>
              </Group>
            </Dropzone>
          </Box>
        )}
        <Divider my="sm" />

        <Group position="right" mt="md">
          <Button loading={loading} disabled={files === null} type="submit">
            Post
          </Button>
        </Group>
      </form>
    </Box>
  );
};
export default MediaPostForm;
