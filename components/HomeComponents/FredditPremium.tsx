import {
  useMantineColorScheme,
  Box,
  Card,
  Title,
  Flex,
  Divider,
  Button,
  Text,
} from '@mantine/core';
import Image from 'next/image';
import React from 'react';
import fredditLogoInvert from '../../public/freddit-invert.png';

const FredditPremium: React.FC = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Card bg={dark ? 'dark' : 'gray.0'} withBorder>
        <Card.Section p="sm">
          <Flex>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Image src={fredditLogoInvert} alt="freedit logo" height={40} width={40} />
            </Box>
            <Box sx={{ flex: 1, paddingLeft: '1rem' }}>
              <Title order={4}>Freddit Premium</Title>
              <Flex gap="1rem" align="flex-start">
                <Text>The best Freddit experience, with monthly Coins</Text>
              </Flex>
            </Box>
          </Flex>
        </Card.Section>
        <Divider />
        <Button color="grape" variant="outline" fullWidth mt="1rem">
          Try Now
        </Button>
      </Card>
    </Box>
  );
};
export default FredditPremium;
