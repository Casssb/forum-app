import React from 'react';
import {
  Menu,
  useMantineColorScheme,
  ActionIcon,
  UnstyledButton,
  ThemeIcon,
  Group,
  Text,
} from '@mantine/core';
import {
  IconUser,
  IconLogin,
  IconLogout,
  IconMenu2,
  IconChevronDown,
  IconUserCircle,
} from '@tabler/icons-react';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { setAuthModalOpen, setAuthModalView } from '../../redux/slices/authModalSlice';
import { auth } from '../../firebase/firebaseConfig';
import { resetCommunityInfo } from '../../redux/slices/communitySlice';

const AccountMenu: React.FC = () => {
  const { colorScheme } = useMantineColorScheme();
  const [user, error] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const dark = colorScheme === 'dark';

  const logOut = async () => {
    await signOut(auth);
    dispatch(resetCommunityInfo());
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        {user ? (
          <UnstyledButton
            sx={(theme) => ({
              padding: '0.2rem',
              color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
              },
            })}
          >
            <Group>
              <ThemeIcon size="lg" variant="gradient" gradient={{ from: 'lime.3', to: 'green.7' }}>
                <IconUser />
              </ThemeIcon>
              <Text size="sm" weight={500}>
                {user?.displayName || user.email?.split('@')[0]}
              </Text>
              <ThemeIcon size="lg" color="gray">
                <IconChevronDown />
              </ThemeIcon>
            </Group>
          </UnstyledButton>
        ) : (
          <ActionIcon size="lg" color={dark ? 'gray' : 'dark'}>
            <IconMenu2 />
          </ActionIcon>
        )}
      </Menu.Target>

      <Menu.Dropdown>
        {user && <Menu.Item icon={<IconUserCircle size={14} />}>Account</Menu.Item>}
        <ColorSchemeToggle />
        <Menu.Divider />
        {user ? (
          <Menu.Item
            icon={<IconLogout size={14} />}
            onClick={() => {
              logOut();
              error && console.log(error);
            }}
          >
            Log Out
          </Menu.Item>
        ) : (
          <Menu.Item
            icon={<IconLogin size={14} />}
            onClick={() => {
              dispatch(setAuthModalOpen(true));
              dispatch(setAuthModalView('existing'));
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
