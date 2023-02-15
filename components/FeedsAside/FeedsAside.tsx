import { Box, Group, Menu, Text, createStyles } from '@mantine/core';
import Image from 'next/image';
import Link, { LinkProps } from 'next/link';
import React from 'react';
import useCommunityInfo from '../../hooks/useCommunityInfo';
import fredditLogoGray from '../../public/freddit-grayscale.png';
import { IconListSearch } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  link: {
    ...theme.fn.focusStyles(),
    display: 'block',
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    lineHeight: 1.2,
    fontSize: theme.fontSizes.sm,
    padding: theme.spacing.xs,
    borderTopRightRadius: theme.radius.sm,
    borderBottomRightRadius: theme.radius.sm,
    borderLeft: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    fontWeight: 500,
    borderLeftColor: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 6 : 7],
    color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 2 : 7],

    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
    },
  },
}));

const FeedsAside: React.FC = () => {
  const { userCommunityInfo } = useCommunityInfo();
  const { classes, cx } = useStyles();
  const items = userCommunityInfo.map((item) => (
    <Box
      component={Link}
      href={`/f/${item.communityId}`}
      key={item.communityId}
      className={cx(classes.link)}
      sx={(theme) => ({ paddingLeft: 1 * theme.spacing.md })}
    >
      <Image
        src={item.imageURL ? item.imageURL : fredditLogoGray}
        alt="community badge"
        height={20}
        width={20}
        style={{ marginRight: '0.4rem' }}
      />
      {`f/${item.communityId}`}
    </Box>
  ));
  return (
    <Box sx={{ padding: '1rem', position: 'sticky', top: '6%' }}>
      <Group mb="md">
        <IconListSearch size={18} stroke={1.5} />
        <Text>Your Communities</Text>
      </Group>
      {items}
    </Box>
  );
};
export default FeedsAside;
