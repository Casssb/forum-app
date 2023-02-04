import { Button } from '@mantine/core';
import {
  IconArticle,
  IconChartArrows,
  IconLink,
  IconMicrophone,
  IconPhoto,
} from '@tabler/icons-react';
import React from 'react';

type NewPostButtonsProps = {};

const NewPostButtons: React.FC<NewPostButtonsProps> = () => {
  return (
    <Button.Group sx={{ flex: 1 }}>
      <Button color="gray" variant="outline" leftIcon={<IconArticle size={22} />} sx={{ flex: 1 }}>
        Post
      </Button>
      <Button color="gray" variant="outline" leftIcon={<IconPhoto size={22} />} sx={{ flex: 1 }}>
        Images & Video
      </Button>
      <Button color="gray" variant="outline" leftIcon={<IconLink size={22} />} sx={{ flex: 1 }}>
        Link
      </Button>
      <Button
        color="gray"
        variant="outline"
        leftIcon={<IconChartArrows size={22} />}
        sx={{ flex: 1 }}
      >
        Poll
      </Button>
      <Button
        color="gray"
        variant="outline"
        leftIcon={<IconMicrophone size={22} />}
        sx={{ flex: 1 }}
      >
        Talk
      </Button>
    </Button.Group>
  );
};
export default NewPostButtons;
