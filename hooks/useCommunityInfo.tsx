import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, doc, getDocs, increment, writeBatch } from 'firebase/firestore';
import {
  CommunityProps,
  UserCommunityInfoProps,
  appendCommunityInfo,
  removeCommunityInfo,
  setUserCommunities,
} from '../redux/slices/communitySlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import { auth, db } from '../firebase/firebaseConfig';
import { setAuthModalOpen, setAuthModalView } from '../redux/slices/authModalSlice';

const useCommunityInfo = () => {
  const [user] = useAuthState(auth);
  const { userCommunityInfo } = useAppSelector((state) => state.community);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState('');

  const joinCommunity = async (communityInfo: CommunityProps) => {
    try {
      const batch = writeBatch(db);
      const newCommunityInfo: UserCommunityInfoProps = {
        communityId: communityInfo.id,
      };
      batch.set(doc(db, `users/${user?.uid}/communityInfo`, communityInfo.id), newCommunityInfo);
      batch.update(doc(db, 'communities', communityInfo.id), {
        members: increment(1),
      });
      await batch.commit();
      dispatch(appendCommunityInfo(newCommunityInfo));
    } catch (error: any) {
      setFirebaseError(error.message);
    }
    setLoading(false);
  };

  const leaveCommunity = async (communityId: string) => {
    try {
      const batch = writeBatch(db);
      batch.delete(doc(db, `users/${user?.uid}/communityInfo`, communityId));
      batch.update(doc(db, 'communities', communityId), {
        members: increment(-1),
      });
      await batch.commit();
      dispatch(removeCommunityInfo(communityId));
    } catch (error: any) {
      setFirebaseError(error.message);
    }
    setLoading(false);
  };

  const handleCommunityJoinLeave = (communityInfo: CommunityProps, isJoined: boolean) => {
    if (!user) {
      dispatch(setAuthModalOpen(true));
      dispatch(setAuthModalView('existing'));
    } else {
      setLoading(true);
      isJoined ? leaveCommunity(communityInfo.id) : joinCommunity(communityInfo);
    }
  };

  const getUserCommunityInfo = async () => {
    setLoading(true);
    try {
      const userCommunityInfoDocs = await getDocs(
        collection(db, `users/${user?.uid}/communityInfo`)
      );
      const userCommunities = userCommunityInfoDocs.docs.map((document) => ({
        ...document.data(),
      }));
      dispatch(setUserCommunities(userCommunities));
    } catch (error: any) {
      setFirebaseError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user && !userCommunityInfo.length) {
      getUserCommunityInfo();
    }
  }, [user]);

  return {
    loading,
    handleCommunityJoinLeave,
  };
};
export default useCommunityInfo;
