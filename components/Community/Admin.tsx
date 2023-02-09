import {
  Box,
  Button,
  Card,
  FileButton,
  Group,
  Text,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useRef, useState } from 'react';
import { db, storage } from '../../firebase/firebaseConfig';
import {
  CommunityProps,
  setCurrentCommunityBackground,
  setCurrentCommunityBadge,
} from '../../redux/slices/communitySlice';
import { useAppDispatch } from '../../redux/hooks/hooks';

interface AdminProps {
  currentCommunity: CommunityProps;
}

const Admin: React.FC<AdminProps> = ({ currentCommunity }) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const [badgeFile, setBadgeFile] = useState<File | null>(null);
  const [bgFile, setBgFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const badgeRef = useRef<() => void>(null);
  const bgRef = useRef<() => void>(null);
  const dispatch = useAppDispatch();

  const clearBadgeFile = () => {
    setBadgeFile(null);
    badgeRef.current?.();
  };

  const clearBgFile = () => {
    setBgFile(null);
    bgRef.current?.();
  };

  const uploadBadge = async () => {
    if (!badgeFile) return;
    setLoading(true);
    try {
      const imageRef = ref(storage, `communities/${currentCommunity.id}/image`);
      await uploadBytes(imageRef, badgeFile);
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, 'communities', currentCommunity.id), {
        imageURL: downloadURL,
      });
      dispatch(setCurrentCommunityBadge(downloadURL));
    } catch (error: any) {
      console.log('Firebase error uploading community badge', error.message);
    }
    setLoading(false);
  };

  const uploadBg = async () => {
    if (!bgFile) return;
    setLoading(true);
    try {
      const imageRef = ref(storage, `communities/${currentCommunity.id}/bgImage`);
      await uploadBytes(imageRef, bgFile);
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, 'communities', currentCommunity.id), {
        bgImageURL: downloadURL,
      });
      dispatch(setCurrentCommunityBackground(downloadURL));
    } catch (error: any) {
      console.log('Firebase error uploading community background', error.message);
    }
    setLoading(false);
  };
  return (
    <Box>
      <Card bg={dark ? 'dark' : 'gray.0'} withBorder>
        <Title order={3}>Admin</Title>
        <>
          <Group position="left" mt="0.8rem">
            <FileButton
              resetRef={badgeRef}
              onChange={setBadgeFile}
              accept="image/png,image/jpeg,image/webp"
            >
              {(props) => <Button {...props}>Choose Badge</Button>}
            </FileButton>
            <Button disabled={!badgeFile} color="red" onClick={clearBadgeFile}>
              Reset
            </Button>
          </Group>
          <Group position="left" mt="0.8rem">
            <Button
              loading={loading}
              variant="outline"
              disabled={!badgeFile}
              onClick={() => uploadBadge()}
            >
              Upload Badge
            </Button>
          </Group>
          {badgeFile && (
            <Text size="sm" align="left" mt="sm">
              Picked file: {badgeFile.name}
            </Text>
          )}
        </>
        <>
          <Group position="left" mt="0.8rem">
            <FileButton resetRef={bgRef} onChange={setBgFile} accept="image/png,image/jpeg,image/webp">
              {(props) => <Button {...props}>Choose Background</Button>}
            </FileButton>
            <Button disabled={!bgFile} color="red" onClick={clearBgFile}>
              Reset
            </Button>
          </Group>
          <Group position="left" mt="0.8rem">
            <Button
              loading={loading}
              variant="outline"
              disabled={!bgFile}
              onClick={() => uploadBg()}
            >
              Upload Background
            </Button>
          </Group>
          {bgFile && (
            <Text size="sm" align="left" mt="sm">
              Picked file: {bgFile.name}
            </Text>
          )}
        </>
      </Card>
    </Box>
  );
};
export default Admin;
