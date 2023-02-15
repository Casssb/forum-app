import { ActionIcon, Button, Menu, Text, useMantineColorScheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconHome2, IconLayoutDashboard, IconPlus, IconTrendingUp } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebaseConfig';
import useCommunityInfo from '../../hooks/useCommunityInfo';
import fredditLogoGray from '../../public/freddit-grayscale.png';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { setCommunityModalOpen } from '../../redux/slices/communityModalSlice';
import NewCommunityModal from '../NewCommunityModal/NewCommunityModal';

type FeedsMenuProps = {};

const FeedsMenu: React.FC<FeedsMenuProps> = () => {
  const { userCommunityInfo } = useCommunityInfo();
  const { colorScheme } = useMantineColorScheme();
  const [user] = useAuthState(auth);
  const dark = colorScheme === 'dark';
  const isMobile = useMediaQuery('(max-width: 700px)');
  const dispatch = useAppDispatch();

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        {isMobile ? (
          <ActionIcon size="lg" color={dark ? 'gray' : 'dark'}>
            <IconLayoutDashboard />
          </ActionIcon>
        ) : (
          <Button leftIcon={<IconLayoutDashboard />} color={dark ? 'gray' : 'gray'}>
            Feeds
          </Button>
        )}
      </Menu.Target>

      <Menu.Dropdown>
        {user && (
          <>
            <Menu.Label>Your Communities</Menu.Label>
            <Menu.Item
              icon={<IconPlus size={14} />}
              onClick={() => dispatch(setCommunityModalOpen(true))}
            >
              Create Community
            </Menu.Item>
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
            <Menu.Divider />
          </>
        )}

        <Menu.Label>Feeds</Menu.Label>
        <Menu.Item icon={<IconHome2 size={14} />} component={Link} href="/">
          Home
        </Menu.Item>
        <Menu.Item icon={<IconTrendingUp size={14} />} component={Link} href="/">
          Popular
        </Menu.Item>
      </Menu.Dropdown>
      <NewCommunityModal />
    </Menu>
  );
};
export default FeedsMenu;
