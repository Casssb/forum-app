import { ActionIcon, Button, Menu, useMantineColorScheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconHome2,
  IconLayoutDashboard,
  IconMessageCircle,
  IconPlus,
  IconTrendingUp,
} from '@tabler/icons-react';
import React from 'react';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { setCommunityModalOpen } from '../../redux/slices/communityModalSlice';
import NewCommunityModal from '../NewCommunityModal/NewCommunityModal';

type FeedsMenuProps = {};

const FeedsMenu: React.FC<FeedsMenuProps> = () => {
  const { colorScheme } = useMantineColorScheme();
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
        <Menu.Label>Your Communities</Menu.Label>
        <Menu.Item
          icon={<IconPlus size={14} />}
          onClick={() => dispatch(setCommunityModalOpen(true))}
        >
          Create Community
        </Menu.Item>
        <Menu.Item icon={<IconMessageCircle size={14} />}>Community Placeholder</Menu.Item>

        <Menu.Divider />

        <Menu.Label>Feeds</Menu.Label>
        <Menu.Item icon={<IconHome2 size={14} />}>Home</Menu.Item>
        <Menu.Item icon={<IconTrendingUp size={14} />}>Popular</Menu.Item>
      </Menu.Dropdown>
      <NewCommunityModal />
    </Menu>
  );
};
export default FeedsMenu;
