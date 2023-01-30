import React from 'react';
import { Flex } from '@mantine/core';
import { communityProps } from '../../redux/slices/communitySlice';

interface CommunityHeaderProps {
  communityInfo: communityProps;
}

const CommunityHeader: React.FC<CommunityHeaderProps> = ({ communityInfo }) => {
  return <Flex>Community Header for {communityInfo.id}</Flex>;
};
export default CommunityHeader;
