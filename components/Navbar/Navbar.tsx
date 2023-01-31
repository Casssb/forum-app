import { createStyles, Header, Group, Title } from '@mantine/core';
import React from 'react';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import AccountMenu from './AccountMenu';
import FeedsMenu from './FeedsMenu';
import fredditLogo from '../../public/freddit-logo.png';
import AuthButtons from './AuthButtons';
import Search from './Search';
import AuthModal from '../AuthModal/AuthModal';
import { auth } from '../../firebase/firebaseConfig';
import ActionIcons from './ActionIcons';

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const Navbar: React.FC = () => {
  const { classes } = useStyles();
  const [user, loading, error] = useAuthState(auth);

  return (
    <Header height={56} className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Image src={fredditLogo} alt="white & green frog logo" width={40} height={40} />
          <Title order={2} display={{ base: 'none', md: 'unset' }}>
            Freddit
          </Title>
          <FeedsMenu />
        </Group>
        <Search />
        <Group sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {user ? <ActionIcons /> : <AuthButtons />}
          <AccountMenu />
        </Group>
        <AuthModal />
      </div>
    </Header>
  );
};
export default Navbar;
