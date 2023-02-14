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
import { useSetState } from '@mantine/hooks';
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
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import fredditLogoGray from '../../public/freddit-grayscale.png';
import { Post } from '../../redux/slices/postsSlice';

interface SinglePostProps {
  post: Post;
  userIsOwner?: boolean;
  userVote?: number;
  deletePost: (post: Post) => Promise<boolean>;
  handleVote: (post: Post, vote: number, communityId: string) => void;
  selectPost?: (post: Post) => void;
  isHomePage?: boolean;
}

const SinglePost: React.FC<SinglePostProps> = ({
  post,
  userVote,
  userIsOwner,
  deletePost,
  handleVote,
  selectPost,
  isHomePage,
}) => {
  const { colorScheme } = useMantineColorScheme();
  const [postError, setPostError] = useSetState(null as any);
  const [loadingDelete, setLoadingDelete] = useSetState<boolean>(false);
  const dark = colorScheme === 'dark';
  const singlePost = !selectPost;
  const router = useRouter();

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
          <Group
            position="left"
            sx={{ height: '100%', cursor: `${singlePost ? 'auto' : 'pointer'}` }}
          >
            {isHomePage && (
              <>
                <Image
                  src={post.communityImageURL ? post.communityImageURL : fredditLogoGray}
                  alt="community logo"
                  height={20}
                  width={20}
                />
                <Link href={`f/${post.communityId}`}>
                  <Text fw={700}>f/{post.communityId}</Text>
                </Link>
              </>
            )}
            <Text>
              Posted by u/{post.creatorDisplayName}{' '}
              {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
            </Text>
          </Group>
          <Title
            order={3}
            sx={{ cursor: `${singlePost ? 'auto' : 'pointer'}` }}
            onClick={() => selectPost && selectPost(post)}
          >
            {post.title}
          </Title>
          {post.imageURL ? (
            <Box
              sx={{
                position: 'relative',
                minHeight: '400px',
                cursor: `${singlePost ? 'auto' : 'pointer'}`,
              }}
              onClick={() => selectPost && selectPost(post)}
            >
              <Image
                src={post.imageURL}
                alt={post.title}
                fill
                placeholder="blur"
                blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN0cnevBwAC9AFR64pKBAAAAABJRU5ErkJggg=="
              />
            </Box>
          ) : (
            <Text
              sx={{ cursor: `${singlePost ? 'auto' : 'pointer'}` }}
              onClick={() => selectPost && selectPost(post)}
            >
              {post.body}
            </Text>
          )}
          <Flex mt="0.4rem">
            <Button
              leftIcon={<IconMessageCircle2 />}
              variant="subtle"
              onClick={() => selectPost && selectPost(post)}
            >
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
                onClick={() => {
                  handleDelete();
                  singlePost && router.back();
                }}
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
