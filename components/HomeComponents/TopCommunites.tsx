import {
  Box,
  Button,
  Card,
  Flex,
  Skeleton,
  Text,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebaseConfig';
import useCommunityInfo from '../../hooks/useCommunityInfo';
import fredditLogoGrayscale from '../../public/freddit-grayscale.png';
import frogCityImage from '../../public/frog-city-watercolour3.png';
import { CommunityProps } from '../../redux/slices/communitySlice';

const TopCommunites: React.FC = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const [communites, setCommunites] = useState<CommunityProps[]>([]);
  const [loading, setLoading] = useState(false);
  const { userCommunityInfo, handleCommunityJoinLeave } = useCommunityInfo();

  const getTopCommunities = async () => {
    setLoading(true);
    try {
      const communityQuery = query(
        collection(db, 'communities'),
        orderBy('members', 'asc'),
        limit(5)
      );
      const communityDocs = await getDocs(communityQuery);
      const communitiesData = communityDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommunites(communitiesData as CommunityProps[]);
    } catch (error: any) {
      console.log('Firebase error getting top 5 communites', error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getTopCommunities();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Card bg={dark ? 'dark' : 'gray.0'} withBorder>
        <Card.Section>
          <Flex direction="column">
            <Box sx={{ width: '100%', position: 'relative', height: '40px' }}>
              <Image
                src={frogCityImage}
                alt="frog in cyberpunk city (watercolor)"
                fill
                style={{ objectFit: 'cover', objectPosition: '5px 80%' }}
              />
            </Box>
            <Box sx={{ flex: 1, paddingLeft: '1rem', margin: '0.8rem 0', width: '100%' }}>
              <Title order={4}>Popular Communities</Title>
              <Flex gap="1rem" align="flex-start" direction="column" w="100%">
                {communites.map((community, index) => {
                  const isJoined = !!userCommunityInfo.find(
                    (elem) => elem.communityId === community.id
                  );
                  return (
                    <>
                      {loading ? (
                        <Box sx={{ width: '100%' }}>
                          <Skeleton height={20} circle mb="xl" />
                          <Skeleton height={8} radius="xl" />
                          <Skeleton height={8} mt={6} radius="xl" />
                          <Skeleton height={8} mt={6} width="70%" radius="xl" />
                        </Box>
                      ) : (
                        <Flex
                          justify="flex-start"
                          align="center"
                          gap="0.6rem"
                          w="100%"
                          px="0.4rem"
                          mt="0.4rem"
                        >
                          <Text>{index + 1}</Text>
                          <Image
                            src={community.imageURL ? community.imageURL : fredditLogoGrayscale}
                            alt="community logo"
                            height={18}
                            width={18}
                          />
                          <Link
                            key={community.id}
                            href={`/f/${community.id}`}
                            style={{ textDecoration: 'none' }}
                          >
                            <Text color={dark ? 'gray.2' : 'dark.9'} fw={600}>
                              {community.id}
                            </Text>
                          </Link>
                          <Button
                            size="xs"
                            variant={isJoined ? 'subtle' : 'outline'}
                            onClick={() => handleCommunityJoinLeave(community, isJoined)}
                            sx={{ marginLeft: 'auto' }}
                          >
                            {isJoined ? 'Leave' : 'Join'}
                          </Button>
                        </Flex>
                      )}
                    </>
                  );
                })}
              </Flex>
            </Box>
          </Flex>
        </Card.Section>
      </Card>
    </Box>
  );
};
export default TopCommunites;
