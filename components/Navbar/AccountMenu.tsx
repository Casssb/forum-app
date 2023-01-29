import React from 'react';
import { Menu, useMantineColorScheme, ActionIcon } from '@mantine/core';
import { IconUser, IconLogin } from '@tabler/icons-react';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { setModalOpen, setModalView } from '../../redux/slices/authModalSlice';

type AccountMenuProps = {};

const AccountMenu: React.FC<AccountMenuProps> = () => {
  const { colorScheme } = useMantineColorScheme();
  const dispatch = useAppDispatch();
  const dark = colorScheme === 'dark';

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon size="lg" variant="outline" color={dark ? 'gray' : 'dark'}>
          <IconUser />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <ColorSchemeToggle />
        <Menu.Divider />
        <Menu.Item
          icon={<IconLogin size={14} />}
          onClick={() => {
            dispatch(setModalOpen(true));
            dispatch(setModalView('existing'));
          }}
        >
          Log In / Sign Up
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
export default AccountMenu;
