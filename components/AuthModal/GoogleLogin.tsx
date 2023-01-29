import { Box, Button } from '@mantine/core';
import React from 'react';
import { IconBrandGoogle } from '@tabler/icons-react';

type GoogleLoginProps = {};

const GoogleLogin: React.FC<GoogleLoginProps> = () => {
  return (
    <Box my="1rem">
      <Button leftIcon={<IconBrandGoogle size={20} />}>Continue with Google</Button>
    </Box>
  );
};
export default GoogleLogin;
