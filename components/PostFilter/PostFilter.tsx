import { Button, Paper, useMantineColorScheme } from '@mantine/core';
import { IconArrowUpCircle, IconFlame, IconRocket, IconRosette } from '@tabler/icons-react';
import React from 'react';

const PostFilter: React.FC = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '0.6rem',
      }}
      bg={dark ? 'dark' : 'gray.0'}
      p="sm"
      withBorder
    >
      <Button variant="light" leftIcon={<IconRocket size={30} />}>
        Best
      </Button>
      <Button variant="subtle" leftIcon={<IconFlame size={30} />}>
        Hot
      </Button>
      <Button variant="subtle" leftIcon={<IconRosette size={30} />}>
        New
      </Button>
      <Button variant="subtle" leftIcon={<IconArrowUpCircle size={30} />}>
        Top
      </Button>
    </Paper>
  );
};
export default PostFilter;
