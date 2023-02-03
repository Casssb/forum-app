/* eslint-disable consistent-return */
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import safeJsonStringify from 'safe-json-stringify';
import { Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { db } from '../../../firebase/firebaseConfig';
import { communityProps } from '../../../redux/slices/communitySlice';
import CommunityHeader from '../../../components/Community/CommunityHeader';
import ThreeColumnPage from '../../../components/Layouts/ThreeColumnPage';
import TwoColumnPage from '../../../components/Layouts/TwoColumnPage';
import FeedsAside from '../../../components/FeedsAside/FeedsAside';
import CreatePost from '../../../components/Community/CreatePost';
import Feed from '../../../components/Community/Feed';
import About from '../../../components/Community/About';
import Rules from '../../../components/Community/Rules';

interface communityPageProps {
  communityInfo: communityProps;
}

const community: React.FC<communityPageProps> = ({ communityInfo }) => {
  const isLarge = useMediaQuery('(min-width: 1000px)');
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
            <Feed />
          </>
          <>
            <About />
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
            <Feed />
          </>
          <>
            <About />
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
