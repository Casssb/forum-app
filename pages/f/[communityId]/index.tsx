/* eslint-disable consistent-return */
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import safeJsonStringify from 'safe-json-stringify';
import { Box } from '@mantine/core';
import { db } from '../../../firebase/firebaseConfig';
import { communityProps } from '../../../redux/slices/communitySlice';
import CommunityHeader from '../../../components/Community/CommunityHeader';

interface communityPageProps {
  communityInfo: communityProps;
}

const community: React.FC<communityPageProps> = ({ communityInfo }) => {
  return (
    <Box>
      <CommunityHeader communityInfo={communityInfo} />
    </Box>
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
