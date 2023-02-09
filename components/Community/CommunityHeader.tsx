import React from 'react';
import {
  ActionIcon,
  Box,
  Button,
  Container,
  Flex,
  Group,
  Text,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import Image from 'next/image';
import { IconBellFilled } from '@tabler/icons-react';
import { CommunityProps } from '../../redux/slices/communitySlice';
import defaultBackground from '../../public/frog-city-watercolour2.png';
import grayscaleLogo from '../../public/freddit-grayscale.png';
import { useAppSelector } from '../../redux/hooks/hooks';
import useCommunityInfo from '../../hooks/useCommunityInfo';

interface CommunityHeaderProps {
  communityInfo: CommunityProps;
}

const CommunityHeader: React.FC<CommunityHeaderProps> = ({ communityInfo }) => {
  const { handleCommunityJoinLeave, loading } = useCommunityInfo();
  const { userCommunityInfo, currentCommunity } = useAppSelector((state) => state.community);
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const isJoined = !!userCommunityInfo.find(
    (community) => community.communityId === communityInfo.id
  );

  return (
    <Flex direction="column" sx={{ height: '12rem', width: '100%' }}>
      <Box sx={{ position: 'relative', height: '50%' }}>
        <Image
          src={currentCommunity?.bgImageURL ? currentCommunity.bgImageURL : defaultBackground}
          alt="frog in black & white watercolour city"
          fill
          style={{ objectFit: 'cover', zIndex: 0 }}
        />
      </Box>
      <Container sx={{ height: '50%', zIndex: 1, width: '100%' }}>
        <Box
          sx={{
            marginTop: '-1rem',
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '1.4rem',
            width: '100%',
          }}
        >
          <Image
            src={currentCommunity?.imageURL ? currentCommunity.imageURL : grayscaleLogo}
            alt="Freddit frog logo, grayscale"
            height={70}
            width={70}
            style={{
              borderRadius: '100%',
              border: `${dark ? '4px solid #1A1B1E' : '4px solid #FFFFFF'}`,
              backgroundColor: `${dark ? '#1A1B1E' : '#FFFFFF'}`,
              zIndex: 3,
            }}
          />
          <Box sx={{ paddingTop: '1.4rem' }}>
            <Title>{communityInfo.id}</Title>
            <Text>{`f/${communityInfo.id}`}</Text>
          </Box>
          <Group>
            <Button
              variant="outline"
              loading={loading}
              onClick={() => handleCommunityJoinLeave(communityInfo, isJoined)}
            >
              {isJoined ? 'Leave' : 'Join'}
            </Button>
            <ActionIcon variant="filled" size="lg" color="blue">
              <IconBellFilled size={20} />
            </ActionIcon>
          </Group>
        </Box>
      </Container>
    </Flex>
  );
};
export default CommunityHeader;
