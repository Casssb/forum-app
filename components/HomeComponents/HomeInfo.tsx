import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Text,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import Image from 'next/image';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebaseConfig';
import frogCityWatercolour from '../../public/frog-city-watercolour2.png';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { setAuthModalOpen, setAuthModalView } from '../../redux/slices/authModalSlice';
import { setCommunityModalOpen } from '../../redux/slices/communityModalSlice';

const HomeInfo: React.FC = () => {
  const { colorScheme } = useMantineColorScheme();
  const [user] = useAuthState(auth);
  const dark = colorScheme === 'dark';
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Card bg={dark ? 'dark' : 'gray.0'} withBorder>
        <Card.Section>
          <Flex direction="column">
            <Box sx={{ width: '100%', position: 'relative', height: '40px' }}>
              <Image
                src={frogCityWatercolour}
                alt="frog in cyberpunk city (watercolor)"
                fill
                style={{ objectFit: 'cover', objectPosition: '5px 80%' }}
              />
            </Box>
            <Box sx={{ flex: 1, paddingLeft: '1rem', margin: '0.8rem 0' }}>
              <Title order={4}>Home</Title>
              <Flex gap="1rem" align="flex-start">
                <Text>
                  Your personal Freddit homepage. Come here to check in with your favorite
                  communites
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Card.Section>
        <Divider />
        <Button
          variant="outline"
          fullWidth
          mt="1rem"
          onClick={() => {
            if (user) {
              dispatch(setCommunityModalOpen(true));
            } else {
              dispatch(setAuthModalOpen(true));
              dispatch(setAuthModalView('existing'));
            }
          }}
        >
          Create Community
        </Button>
      </Card>
    </Box>
  );
};
export default HomeInfo;
