import { Box, Button, Checkbox, Group, Radio, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconEyeOff, IconLock, IconUser } from '@tabler/icons-react';
import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase/firebaseConfig';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { setCommunityModalOpen } from '../../redux/slices/communityModalSlice';

interface CommunityFormProps {
  name: string;
  nsfw: boolean;
  type: string;
}

const NewCommunityForm: React.FC = () => {
  const [communityExists, setCommunityExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
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
          ? 'Too long! Must be between 3 and 20 characters'
          : /[ `!@#$%^&*()+\-=[\]{};':"\\|,.<>/?~]/.test(value)
          ? 'Names cannot contain spaces, and underscores are the only special characters allowed'
          : null,
    },
  });

  const handleSubmit = async ({ name, nsfw, type }: CommunityFormProps) => {
    setCommunityExists(false);
    setLoading(true);
    try {
      const docRef = doc(db, 'communities', name);
      await runTransaction(db, async (transaction) => {
        const community = await transaction.get(docRef);
        if (community.exists()) {
          setCommunityExists(true);
        }
        transaction.set(docRef, {
          creator: user?.uid,
          createdAt: serverTimestamp(),
          members: 1,
          type,
          nsfw,
        });
        transaction.set(doc(db, `users/${user?.uid}/communityInfo`, name), {
          communityId: name,
          isAdmin: true,
        });
      });
    } catch (error) {
      console.log('error creating a new community', error);
    }
    setLoading(false);
    dispatch(setCommunityModalOpen(false));
    router.push(`/f/${name}`);
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
          <Button loading={loading} type="submit">
            Create Community
          </Button>
        </Group>
        {communityExists && (
          <Text mt="1rem" color="red">
            A community with this name alreasy exists
          </Text>
        )}
      </form>
    </Box>
  );
};
export default NewCommunityForm;
