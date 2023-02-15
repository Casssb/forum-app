/* eslint-disable consistent-return */
import { useMediaQuery } from '@mantine/hooks';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import safeJsonStringify from 'safe-json-stringify';
import About from '../../../components/Community/About';
import Admin from '../../../components/Community/Admin';
import CommunityHeader from '../../../components/Community/CommunityHeader';
import CreatePost from '../../../components/Community/CreatePost';
import Rules from '../../../components/Community/Rules';
import FeedsAside from '../../../components/FeedsAside/FeedsAside';
import ThreeColumnPage from '../../../components/Layouts/ThreeColumnPage';
import TwoColumnPage from '../../../components/Layouts/TwoColumnPage';
import PostsFeed from '../../../components/Posts/PostsFeed';
import { auth, db } from '../../../firebase/firebaseConfig';
import { useAppDispatch } from '../../../redux/hooks/hooks';
import { CommunityProps, addCurrentCommunity } from '../../../redux/slices/communitySlice';
import ScrollToTop from '../../../components/ScrollToTop/ScrollToTop';
import PostFilter from '../../../components/PostFilter/PostFilter';

interface communityPageProps {
  communityInfo: CommunityProps;
}

const community: React.FC<communityPageProps> = ({ communityInfo }) => {
  const isLarge = useMediaQuery('(min-width: 1200px)');
  const dispatch = useAppDispatch();
  const [user] = useAuthState(auth);

  useEffect(() => {
    dispatch(addCurrentCommunity(communityInfo));
  }, [communityInfo]);
  return (
    <>
      {isLarge && user ? (
        <ThreeColumnPage>
          <>
            <CommunityHeader communityInfo={communityInfo} />
          </>
          <>
            <FeedsAside />
          </>
          <>
            <CreatePost />
            <PostFilter />
            <PostsFeed communityInfo={communityInfo} />
          </>
          <>
            <About currentCommunity={communityInfo} />
            {user?.uid === communityInfo.creator && <Admin currentCommunity={communityInfo} />}
            <Rules communityInfo={communityInfo} />
            <ScrollToTop />
          </>
        </ThreeColumnPage>
      ) : (
        <TwoColumnPage>
          <>
            <CommunityHeader communityInfo={communityInfo} />
          </>
          <>
            <CreatePost />
            <PostFilter />
            <PostsFeed communityInfo={communityInfo} />
          </>
          <>
            <About currentCommunity={communityInfo} />
            {user?.uid === communityInfo.creator && <Admin currentCommunity={communityInfo} />}
            <Rules communityInfo={communityInfo} />
            <ScrollToTop />
          </>
        </TwoColumnPage>
      )}
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const docRef = doc(db, 'communities', context.query.communityId as string);
    const communityData = await getDoc(docRef);

    if (!communityData.exists()) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        communityInfo: JSON.parse(
          safeJsonStringify({ id: communityData.id, ...communityData.data() })
        ),
      },
    };
  } catch (error) {
    console.log('Next SSR error', error);
  }
}

export default community;
