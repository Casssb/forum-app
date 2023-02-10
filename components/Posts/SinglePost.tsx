import React from 'react';
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Text,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconArrowBigDown,
  IconArrowBigDownFilled,
  IconArrowBigUp,
  IconArrowBigUpFilled,
  IconBookmark,
  IconMessageCircle2,
  IconShare,
  IconTrash,
} from '@tabler/icons-react';
import moment from 'moment';
import Image from 'next/image';
import { useSetState } from '@mantine/hooks';
import { Post } from '../../redux/slices/postsSlice';

interface SinglePostProps {
  post: Post;
  userIsOwner?: boolean;
  userVote?: number;
  deletePost: (post: Post) => Promise<boolean>;
  handleVote: (post: Post, vote: number, communityId: string) => void;
}

const SinglePost: React.FC<SinglePostProps> = ({
  post,
  userVote,
  userIsOwner,
  deletePost,
  handleVote,
}) => {
  const { colorScheme } = useMantineColorScheme();
  const [postError, setPostError] = useSetState(null as any);
  const [loadingDelete, setLoadingDelete] = useSetState<boolean>(false);
  const dark = colorScheme === 'dark';

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const success = await deletePost(post);
      if (!success) {
        throw new Error('Failed to delete post');
      }
    } catch (error: any) {
      setPostError(error.message);
    }
    setLoadingDelete(false);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: '0.6rem',
        cursor: 'pointer',
        height: '100%',
      }}
      p="xs"
      bg={dark ? 'dark' : 'gray.0'}
      withBorder
    >
      <Box sx={{ display: 'flex', gap: '0.4rem', width: '100%', height: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '40px',
            justifyContent: 'flex-start',
            height: '100%',
          }}
        >
          <Flex
            direction="column"
            align="center"
            justify="flex-start"
            bg={dark ? 'dark.7' : 'gray.1'}
            py="0.4rem"
          >
            <ActionIcon variant="subtle" onClick={() => handleVote(post, 1, post.communityId)}>
              {userVote && userVote === 1 ? <IconArrowBigUpFilled /> : <IconArrowBigUp />}
            </ActionIcon>
            <Text>{post.numOfVotes}</Text>
            <ActionIcon variant="subtle" onClick={() => handleVote(post, -1, post.communityId)}>
              {userVote && userVote === -1 ? <IconArrowBigDownFilled /> : <IconArrowBigDown />}
            </ActionIcon>
          </Flex>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'flex-start',
            height: '100%',
          }}
        >
          <Group position="left" sx={{ height: '100%' }}>
            <Text>
              Posted by u/{post.creatorDisplayName}{' '}
              {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
            </Text>
          </Group>
          <Title order={3}>{post.title}</Title>
          {post.imageURL ? (
            <Box sx={{ position: 'relative', height: '400px' }}>
              <Image
                src={post.imageURL}
                alt={post.title}
                fill
                placeholder="blur"
                blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN0cnevBwAC9AFR64pKBAAAAABJRU5ErkJggg=="
              />
            </Box>
          ) : (
            <Text>{post.body}</Text>
          )}
          <Flex mt="0.4rem">
            <Button leftIcon={<IconMessageCircle2 />} variant="subtle">
              {post.totalComments}
            </Button>
            <Button leftIcon={<IconShare />} variant="subtle">
              Share
            </Button>
            <Button leftIcon={<IconBookmark />} variant="subtle">
              Save
            </Button>
            {userIsOwner && (
              <Button
                loading={loadingDelete}
                leftIcon={<IconTrash />}
                variant="subtle"
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
          </Flex>
        </Box>
      </Box>
    </Card>
  );
};
export default SinglePost;
