import { Box, Container } from '@mantine/core';
import React, { ReactNode } from 'react';

interface ThreeColumnPageProps {
  children: ReactNode[];
}

const ThreeColumnPage: React.FC<ThreeColumnPageProps> = ({ children }: ThreeColumnPageProps) => {
  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ border: '2px solid red', flex: '1' }}>{children[1]} 1</Box>
        <Box sx={{ flex: '4' }}>
          <Box>{children[0]} 1</Box>
          <Container size="xl" sx={{ display: 'flex', width: '100%', gap: '1rem', flex: '3' }}>
            <Box sx={{ flex: '2' }}>{children[2]} 2</Box>
            <Box sx={{ flex: '1' }}>{children[3]} 3</Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};
export default ThreeColumnPage;
