import { Box, Container } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { ReactNode } from 'react';

interface TwoColumnPageProps {
  children: ReactNode[];
}

const TwoColumnPage: React.FC<TwoColumnPageProps> = ({ children }: TwoColumnPageProps) => {
  const isSmall = useMediaQuery('(max-width: 900px)');
  return (
    <Box>
      <Box>{children[0]}</Box>
      <Container
        size="xl"
        sx={{ display: 'flex', gap: '1rem', flexDirection: `${isSmall ? 'column' : 'row'}` }}
      >
        <Box sx={{ flex: '3' }}>{children[1]}</Box>
        <Box sx={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {children[2]}
        </Box>
      </Container>
    </Box>
  );
};
export default TwoColumnPage;
