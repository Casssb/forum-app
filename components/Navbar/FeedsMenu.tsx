import React from 'react';
import { Menu, Button, Text, useMantineColorScheme, ActionIcon } from '@mantine/core';
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconHome2,
} from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { ColorSchemeToggle } from './ColorSchemeToggle';

type FeedsMenuProps = {};

const FeedsMenu: React.FC<FeedsMenuProps> = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        {isMobile ? (
          <ActionIcon size="lg" variant="outline" color={dark ? 'gray' : 'dark'}>
            <IconHome2 />
          </ActionIcon>
        ) : (
          <Button leftIcon={<IconHome2 />} variant="outline" color={dark ? 'gray' : 'dark'}>
            Home
          </Button>
        )}
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <ColorSchemeToggle />
        <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
        <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
        <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>
        <Menu.Item
          icon={<IconSearch size={14} />}
          rightSection={
            <Text size="xs" color="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<IconArrowsLeftRight size={14} />}>Transfer my data</Menu.Item>
        <Menu.Item color="red" icon={<IconTrash size={14} />}>
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
export default FeedsMenu;
