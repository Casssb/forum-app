import { Modal } from '@mantine/core';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { setCommunityModalOpen } from '../../redux/slices/communityModalSlice';
import NewCommunityForm from './NewCommunityForm';

type NewCommunityModalProps = {};

const NewCommunityModal: React.FC<NewCommunityModalProps> = () => {
  const { isModalOpen } = useAppSelector((state) => state.communityModal);
  const dispatch = useAppDispatch();
  return (
    <Modal
      opened={isModalOpen}
      onClose={() => dispatch(setCommunityModalOpen(false))}
      title="Create a community"
    >
      <NewCommunityForm />
    </Modal>
  );
};
export default NewCommunityModal;
