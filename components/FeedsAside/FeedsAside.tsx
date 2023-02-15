import { Menu, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import useCommunityInfo from '../../hooks/useCommunityInfo';
import fredditLogoGray from '../../public/freddit-grayscale.png';

interface FeedsAsideProps {}

const FeedsAside: React.FC<FeedsAsideProps> = () => {
  const { userCommunityInfo } = useCommunityInfo();
  return (
    <Menu shadow="md" width="90%">
      <Menu.Item disabled>Filter</Menu.Item>
      <Menu.Label>Your Communities</Menu.Label>
      {userCommunityInfo.map((community) => (
        <Menu.Item
          key={community.communityId}
          component={Link}
          href={`/f/${community.communityId}`}
          icon={
            <Image
              src={community.imageURL ? community.imageURL : fredditLogoGray}
              alt="community badge"
              height={15}
              width={15}
            />
          }
        >
          {`f/${community.communityId}`}
          {community.isAdmin && (
            <Text pl="0.6rem" span variant="gradient">
              Admin
            </Text>
          )}
        </Menu.Item>
      ))}
    </Menu>
  );
};
export default FeedsAside;
