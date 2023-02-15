import { Box, Button } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import React from 'react';

const ScrollToTop: React.FC = () => {
  const [scroll, scrollTo] = useWindowScroll();
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'sticky',
        top: '93%',
        paddingBottom: '1rem',
      }}
    >
      <Button variant="outline" onClick={() => scrollTo({ y: 0 })}>
        Back to Top
      </Button>
    </Box>
  );
};
export default ScrollToTop;
