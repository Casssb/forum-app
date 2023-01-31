import { Box, Container } from '@mantine/core';
import React, { ReactNode } from 'react';

interface ThreeColumnPageProps {
  children: ReactNode[];
}

const ThreeColumnPage: React.FC<ThreeColumnPageProps> = ({ children }: ThreeColumnPageProps) => {
  return (
    <Container>
      <Box>{children[0]} 1</Box>
      <Box>{children[1]} 2</Box>
      <Box>{children[2]} 3</Box>
    </Container>
  );
};
export default ThreeColumnPage;
