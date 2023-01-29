import React from 'react';
import { Menu, useMantineColorScheme, ActionIcon } from '@mantine/core';
import { IconUser, IconLogin, IconLogout, IconMenu2 } from '@tabler/icons-react';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { setModalOpen, setModalView } from '../../redux/slices/authModalSlice';
import { auth } from '../../firebase/firebaseConfig';

type AccountMenuProps = {};

const AccountMenu: React.FC<AccountMenuProps> = () => {
  const { colorScheme } = useMantineColorScheme();
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const dark = colorScheme === 'dark';

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        {user ? (
          <ActionIcon size="lg" variant="gradient" gradient={{ from: 'lime.3', to: 'green.7' }}>
            <IconUser />
          </ActionIcon>
        ) : (
          <ActionIcon size="lg" color={dark ? 'gray' : 'dark'}>
            <IconMenu2 />
          </ActionIcon>
        )}
      </Menu.Target>

      <Menu.Dropdown>
        <ColorSchemeToggle />
        <Menu.Divider />
        {user ? (
          <Menu.Item
            icon={<IconLogout size={14} />}
            onClick={() => {
              signOut(auth);
              error && console.log(error);
            }}
          >
            Log Out
          </Menu.Item>
        ) : (
          <Menu.Item
            icon={<IconLogin size={14} />}
            onClick={() => {
              dispatch(setModalOpen(true));
              dispatch(setModalView('existing'));
            }}
          >
            Log In / Sign Up
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};
export default AccountMenu;
