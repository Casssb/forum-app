/* eslint-disable consistent-return */
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React, { useEffect } from 'react';
import safeJsonStringify from 'safe-json-stringify';
import { useMediaQuery } from '@mantine/hooks';
import { db } from '../../../firebase/firebaseConfig';
import { CommunityProps, addCurrentCommunity } from '../../../redux/slices/communitySlice';
import CommunityHeader from '../../../components/Community/CommunityHeader';
import ThreeColumnPage from '../../../components/Layouts/ThreeColumnPage';
import TwoColumnPage from '../../../components/Layouts/TwoColumnPage';
import FeedsAside from '../../../components/FeedsAside/FeedsAside';
import CreatePost from '../../../components/Community/CreatePost';
import About from '../../../components/Community/About';
import Rules from '../../../components/Community/Rules';
import PostsFeed from '../../../components/Posts/PostsFeed';
import { useAppDispatch } from '../../../redux/hooks/hooks';

interface communityPageProps {
  communityInfo: CommunityProps;
}

const community: React.FC<communityPageProps> = ({ communityInfo }) => {
  const isLarge = useMediaQuery('(min-width: 1000px)');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addCurrentCommunity(communityInfo));
  }, []);
  return (
    <>
      {isLarge ? (
        <ThreeColumnPage>
          <>
            <CommunityHeader communityInfo={communityInfo} />
          </>
          <>
            <FeedsAside />
          </>
          <>
            <CreatePost />
            <PostsFeed communityInfo={communityInfo} />
          </>
          <>
            <About currentCommunity={communityInfo} />
            <Rules />
          </>
        </ThreeColumnPage>
      ) : (
        <TwoColumnPage>
          <>
            <CommunityHeader communityInfo={communityInfo} />
          </>
          <>
            <CreatePost />
            <PostsFeed communityInfo={communityInfo} />
          </>
          <>
            <About currentCommunity={communityInfo} />
            <Rules />
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
