import { Box, Container } from '@mantine/core';
import React, { ReactNode } from 'react';

interface TwoColumnPageProps {
  children: ReactNode[];
}

const TwoColumnPage: React.FC<TwoColumnPageProps> = ({ children }: TwoColumnPageProps) => {
  return (
    <Container>
      <Box>{children[0]} 1</Box>
      <Box>{children[1]} 2</Box>
    </Container>
  );
};
export default TwoColumnPage;
