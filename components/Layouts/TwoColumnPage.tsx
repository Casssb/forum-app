import { Box, Container } from '@mantine/core';
import React, { ReactNode } from 'react';

interface TwoColumnPageProps {
  children: ReactNode[];
}

const TwoColumnPage: React.FC<TwoColumnPageProps> = ({ children }: TwoColumnPageProps) => {
  return (
    <Box>
      <Box>{children[0]} 1</Box>
      <Container size="xl" sx={{ display: 'flex', gap: '1rem' }}>
        <Box sx={{ flex: '3' }}>{children[1]} 1</Box>
        <Box sx={{ border: '2px solid green', flex: '1' }}>{children[2]} 2</Box>
      </Container>
    </Box>
  );
};
export default TwoColumnPage;
