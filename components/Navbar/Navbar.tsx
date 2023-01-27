import { createStyles, Header, Autocomplete, Group, Burger, Button, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import React from 'react';
import Image from 'next/image';
import AccountMenu from './AccountMenu';
import FeedsMenu from './FeedsMenu';
import fredditLogo from '../../public/freddit-logo.png';

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

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
}));

const Navbar: React.FC = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  return (
    <Header height={56} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Group>
          {/* <Burger opened={opened} onClick={toggle} size="sm" /> */}
          <Image src={fredditLogo} alt="white & green frog logo" width={40} height={40} />
          <Title order={2}>Freddit</Title>
          <FeedsMenu />
        </Group>
        <Autocomplete
          className={classes.search}
          placeholder="Search"
          icon={<IconSearch />}
          data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
        />
        <Group sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Group ml={50} spacing={5} className={classes.links}>
            <Button>Sign Up</Button>
            <Button>Log In</Button>
          </Group>
          <AccountMenu />
        </Group>
      </div>
    </Header>
  );
};
export default Navbar;
