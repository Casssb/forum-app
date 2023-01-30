import { ActionIcon, Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconTrendingUp, IconPlus, IconCoinPound } from '@tabler/icons-react';
import React from 'react';

type ActionIconsProps = {};

const ActionIcons: React.FC<ActionIconsProps> = () => {
  const isMobile = useMediaQuery('(max-width: 700px)');

  return (
    <Flex gap="0.2rem">
      {!isMobile && (
        <Flex>
          <ActionIcon title="Coin">
            <IconCoinPound />
          </ActionIcon>
          <ActionIcon title="Trending">
            <IconTrendingUp />
          </ActionIcon>
        </Flex>
      )}
      <ActionIcon title="Create Post">
        <IconPlus size={28} />
      </ActionIcon>
    </Flex>
  );
};
export default ActionIcons;
