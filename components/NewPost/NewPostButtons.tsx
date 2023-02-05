import { Button } from '@mantine/core';
import {
  IconArticle,
  IconChartArrows,
  IconLink,
  IconMicrophone,
  IconPhoto,
} from '@tabler/icons-react';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { setpostFormView } from '../../redux/slices/postFormSlice';

type NewPostButtonsProps = {};

const NewPostButtons: React.FC<NewPostButtonsProps> = () => {
  const dispatch = useAppDispatch();
  const { viewState } = useAppSelector((state) => state.postForm);
  return (
    <Button.Group sx={{ flex: 1 }}>
      <Button
        color={viewState === 'post' ? 'blue' : 'gray'}
        variant="outline"
        leftIcon={<IconArticle size={22} />}
        sx={{ flex: 1 }}
        onClick={() => dispatch(setpostFormView('post'))}
      >
        Post
      </Button>
      <Button
        color={viewState === 'media' ? 'blue' : 'gray'}
        variant="outline"
        leftIcon={<IconPhoto size={22} />}
        sx={{ flex: 1 }}
        onClick={() => dispatch(setpostFormView('media'))}
      >
        Images & Video
      </Button>
      <Button
        color={viewState === 'link' ? 'blue' : 'gray'}
        variant="outline"
        leftIcon={<IconLink size={22} />}
        sx={{ flex: 1 }}
        onClick={() => dispatch(setpostFormView('link'))}
      >
        Link
      </Button>
      <Button
        color={viewState === 'poll' ? 'blue' : 'gray'}
        variant="outline"
        leftIcon={<IconChartArrows size={22} />}
        sx={{ flex: 1 }}
        onClick={() => dispatch(setpostFormView('poll'))}
      >
        Poll
      </Button>
      <Button
        color={viewState === 'talk' ? 'blue' : 'gray'}
        variant="outline"
        leftIcon={<IconMicrophone size={22} />}
        sx={{ flex: 1 }}
        onClick={() => dispatch(setpostFormView('talk'))}
      >
        Talk
      </Button>
    </Button.Group>
  );
};
export default NewPostButtons;
