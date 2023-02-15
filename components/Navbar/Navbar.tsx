import { Group, Header, Title, createStyles } from '@mantine/core';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebaseConfig';
import fredditLogo from '../../public/freddit-logo.png';
import AuthModal from '../AuthModal/AuthModal';
import AccountMenu from './AccountMenu';
import ActionIcons from './ActionIcons';
import AuthButtons from './AuthButtons';
import FeedsMenu from './FeedsMenu';
import Search from './Search';

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    position: 'sticky',
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
  const [user] = useAuthState(auth);
  const router = useRouter();

  return (
    <Header height={56} className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Image src={fredditLogo} alt="white & green frog logo" width={40} height={40} />
          <Title
            order={2}
            display={{ base: 'none', md: 'unset' }}
            onClick={() => router.push('/')}
            sx={{ cursor: 'pointer' }}
          >
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
