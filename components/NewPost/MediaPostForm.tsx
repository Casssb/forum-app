import React, { useState } from 'react';
import { TextInput, Button, Group, Box, Divider, Text, useMantineTheme } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import Image from 'next/image';

interface MediaPostFormProps {}

interface MediaFormProps {
  title: string;
}

const MediaPostForm: React.FC<MediaPostFormProps> = () => {
  const theme = useMantineTheme();
  const [files, setFiles] = useState<FileWithPath[] | null>(null);

  const form = useForm({
    initialValues: {
      title: '',
    },

    validate: {
      title: (value) => (value.length < 3 ? 'Must be at least 3 characters' : null),
    },
  });

  const handleSubmitMediaPost = (values: MediaFormProps) => {
    const imageUrl = URL.createObjectURL(files![0]);
    console.log(values, imageUrl);
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
        <Divider my="sm" />
        {files?.length ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {createImagePreview()}
            <Button color="red" onClick={() => setFiles(null)}>
              Remove file
            </Button>
          </Box>
        ) : (
          <Box>
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

        <Group position="right" mt="md">
          <Button disabled={files === null} type="submit">
            Post
          </Button>
        </Group>
      </form>
    </Box>
  );
};
export default MediaPostForm;
