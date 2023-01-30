import { Box, Button, Checkbox, Group, Radio, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';
import { IconUser, IconEyeOff, IconLock } from '@tabler/icons-react';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { setCommunityModalOpen } from '../../redux/slices/communityModalSlice';

interface CommunityFormProps {
  name: string;
  nsfw: boolean;
  type: string;
}

const NewCommunityForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const form = useForm({
    initialValues: {
      name: '',
      nsfw: false,
      type: 'public',
    },

    validate: {
      name: (value) =>
        value.length < 3
          ? 'Must have at least 3 characters'
          : value.length > 20
          ? 'Too long! (20 characters max)'
          : null,
    },
  });

  const handleSubmit = (values: CommunityFormProps) => {
    console.log(values.name, values.nsfw, values.type);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          required
          label="Name"
          description="Community names including capitalization cannot be changed"
          placeholder="f/"
          {...form.getInputProps('name')}
        />

        <Radio.Group
          name="Community Type"
          orientation="vertical"
          label="Community Type"
          spacing="sm"
          mt="1rem"
          required
          {...form.getInputProps('type')}
        >
          <Radio
            value="public"
            label="Public"
            size="md"
            icon={IconUser}
            description="Anyone can view, post and comment to this community"
          />
          <Radio
            value="restricted"
            label="Restricted"
            size="md"
            icon={IconEyeOff}
            description="Anyone can view this community, but only approved users can post"
          />
          <Radio
            value="private"
            label="Private"
            size="md"
            icon={IconLock}
            description="Only approved users can view and submit to this community"
          />
        </Radio.Group>

        <Checkbox
          name="Adult Content"
          mt="md"
          label=" NSFW 18+ year old community"
          color="red"
          {...form.getInputProps('nsfw', { type: 'checkbox' })}
        />

        <Group position="right" mt="md">
          <Button variant="outline" onClick={() => dispatch(setCommunityModalOpen(false))}>
            Cancel
          </Button>
          <Button type="submit">Create Community</Button>
        </Group>
      </form>
    </Box>
  );
};
export default NewCommunityForm;
