import { Card, Skeleton, Stack } from '@mantine/core';
import React from 'react';

const PostSkeleton: React.FC = () => {
  return (
    <Stack mt="1rem">
      <Card>
        <Skeleton height={8} my={6} width="40%" radius="md" />
        <Skeleton height={8} radius="md" />
        <Skeleton height={8} mt={6} radius="md" />
        <Skeleton height={8} mt={6} width="70%" radius="md" />
        <Skeleton height={300} mt={6} />
      </Card>
      <Card>
        <Skeleton height={8} my={6} width="40%" radius="md" />
        <Skeleton height={8} radius="md" />
        <Skeleton height={8} mt={6} radius="md" />
        <Skeleton height={8} mt={6} width="70%" radius="md" />
        <Skeleton height={300} mt={6} />
      </Card>
      <Card>
        <Skeleton height={8} my={6} width="40%" radius="md" />
        <Skeleton height={8} radius="md" />
        <Skeleton height={8} mt={6} radius="md" />
        <Skeleton height={8} mt={6} width="70%" radius="md" />
        <Skeleton height={300} mt={6} />
      </Card>
    </Stack>
  );
};
export default PostSkeleton;
