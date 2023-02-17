import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Text,
  ThemeIcon,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { IconCake } from '@tabler/icons-react';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebaseConfig';
import frogBG from '../../public/frog-city-watercolour3.png';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { setAuthModalOpen, setAuthModalView } from '../../redux/slices/authModalSlice';
import { CommunityProps } from '../../redux/slices/communitySlice';

interface AboutProps {
  currentCommunity: CommunityProps;
}

const About: React.FC<AboutProps> = ({ currentCommunity }) => {
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Card bg={dark ? 'dark' : 'gray.0'} withBorder>
        <Card.Section sx={{ height: '60px', position: 'relative' }}>
          <Image
            src={frogBG}
            fill
            alt="watercolour frog in future city"
            style={{ objectFit: 'cover' }}
          />
        </Card.Section>
        <Card.Section p="sm">
          <Title order={3}>About Community</Title>
          <Flex gap="1rem" align="flex-start" mt="0.5rem">
            <ThemeIcon size="sm" color="dark">
              <IconCake size={20} />
            </ThemeIcon>
            {currentCommunity.createdAt && (
              <Text>
                Created{' '}
                {moment(new Date(currentCommunity.createdAt.seconds * 1000)).format('MMM DD, YYYY')}
              </Text>
            )}
            {currentCommunity.nsfw && (
              <Text
                span
                variant="gradient"
                fw={700}
                gradient={{ from: 'red', to: 'grape', deg: 45 }}
              >
                18+
              </Text>
            )}
          </Flex>
        </Card.Section>
        <Divider />
        <Flex gap="1rem" py="0.6rem">
          <Flex direction="column" sx={{ flex: '1' }}>
            <Title order={4}>{currentCommunity.members}</Title>
            <Text>Members</Text>
          </Flex>
          <Flex direction="column" sx={{ flex: '1' }}>
            <Title order={4}>1</Title>
            <Text>Online</Text>
          </Flex>
        </Flex>
        <Divider />
        <Button
          variant="outline"
          fullWidth
          mt="1rem"
          onClick={() => {
            if (!user) {
              dispatch(setAuthModalOpen(true));
              dispatch(setAuthModalView('existing'));
              return;
            }
            router.push(`/f/${currentCommunity.id}/submit`);
          }}
        >
          Create Post
        </Button>
      </Card>
    </Box>
  );
};
export default About;
