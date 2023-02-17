import { collection, doc, getDoc, getDocs, increment, writeBatch } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/firebaseConfig';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import { setAuthModalOpen, setAuthModalView } from '../redux/slices/authModalSlice';
import {
  CommunityProps,
  UserCommunityInfoProps,
  addCurrentCommunity,
  appendCommunityInfo,
  removeCommunityInfo,
  setUserCommunities,
} from '../redux/slices/communitySlice';

const useCommunityInfo = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { userCommunityInfo, currentCommunity } = useAppSelector((state) => state.community);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState('');

  const joinCommunity = async (communityInfo: CommunityProps) => {
    try {
      const batch = writeBatch(db);
      const newCommunityInfo: UserCommunityInfoProps = {
        communityId: communityInfo.id,
        imageURL: communityInfo.imageURL || '',
        isAdmin: user?.uid === communityInfo.creator,
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

  const getSelectedCommunityInfo = async (communityId: string) => {
    try {
      const communityDocRef = doc(db, 'communities', communityId);
      const communityDoc = await getDoc(communityDocRef);
      const communityData = {
        id: communityDoc.id,
        ...communityDoc.data(),
      };
      dispatch(addCurrentCommunity(communityData as CommunityProps));
    } catch (error: any) {
      console.log('Firebase error getting single community data', error.message);
    }
  };

  useEffect(() => {
    if (user && !userCommunityInfo.length) {
      getUserCommunityInfo();
    }
  }, [user]);

  useEffect(() => {
    const { communityId } = router.query;
    if (communityId && !currentCommunity) {
      getSelectedCommunityInfo(communityId as string);
    }
  }, [currentCommunity, router.query]);

  return {
    loading,
    userCommunityInfo,
    currentCommunity,
    handleCommunityJoinLeave,
  };
};
export default useCommunityInfo;
