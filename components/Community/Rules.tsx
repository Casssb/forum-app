import { Accordion, Box, Card, Title, useMantineColorScheme } from '@mantine/core';
import React from 'react';
import { CommunityProps } from '../../redux/slices/communitySlice';

interface RulesProps {
  communityInfo: CommunityProps;
}

const Rules: React.FC<RulesProps> = ({ communityInfo }) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const rules = [
    {
      title: '1.Tech Stack',
      body: 'This app was made with Typescript, React, NextJS, Mantine & Redux Toolkit',
    },
    {
      title: '2.Features',
      body: 'There is full user authorisation via Firebase (with the help of Firebase Hooks) as well as most of Reddits core functionality. You can create communities as well as create & delete posts & comments, & vote on posts',
    },
    {
      title: '3.Improvements',
      body: "There are a few features I've created a skeleton for but not yet completed. I'd like to add full filter functionality for posts and make better use of Next's server rendering features",
    },
  ];
  return (
    <Box>
      <Card bg={dark ? 'dark' : 'gray.0'} withBorder>
        <Title order={5}>{`f/${communityInfo.id} Rules`}</Title>
        <Accordion defaultValue="rules">
          {rules.map((rule) => (
            <Accordion.Item value={rule.title} key={rule.title}>
              <Accordion.Control>{rule.title}</Accordion.Control>
              <Accordion.Panel>{rule.body}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Card>
    </Box>
  );
};
export default Rules;
