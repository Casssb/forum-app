import { Box, Container } from '@mantine/core';
import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import About from '../../../../components/Community/About';
import Comments from '../../../../components/Posts/Comments';
import SinglePost from '../../../../components/Posts/SinglePost';
import { auth, db } from '../../../../firebase/firebaseConfig';
import useCommunityInfo from '../../../../hooks/useCommunityInfo';
import usePosts from '../../../../hooks/usePosts';
import { useAppDispatch } from '../../../../redux/hooks/hooks';
import { Post, setSelectedPost } from '../../../../redux/slices/postsSlice';
import ScrollToTop from '../../../../components/ScrollToTop/ScrollToTop';

const PostPage: React.FC = () => {
  const { postVotes, selectedPost, deletePost, handleVote } = usePosts();
  const { currentCommunity } = useCommunityInfo();
  const [user] = useAuthState(auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const fetchPost = async (postId: string) => {
    try {
      const postDocRef = doc(db, 'posts', postId);
      const postDoc = await getDoc(postDocRef);
      const selectedPostData = {
        id: postDoc.id,
        ...postDoc.data(),
      };
      dispatch(setSelectedPost(selectedPostData as Post));
    } catch (error: any) {
      console.log('Firebase error getting single post', error.message);
    }
  };

  useEffect(() => {
    const { postId } = router.query;
    if (postId && !selectedPost) {
      fetchPost(postId as string);
    }
  }, [router.query, selectedPost]);

  return (
    <Box>
      <Container size="xl" sx={{ display: 'flex', gap: '1rem', marginTop: '0.8rem' }}>
        <Box sx={{ flex: '3', height: 'max-content' }}>
          {selectedPost && (
            <SinglePost
              post={selectedPost}
              userIsOwner={user?.uid === selectedPost.creator}
              userVote={postVotes.find((vote) => vote.postId === selectedPost.id)?.voteValue}
              deletePost={deletePost}
              handleVote={handleVote}
            />
          )}
          {selectedPost && (
            <Comments
              selectedPost={selectedPost}
              communityId={currentCommunity?.id as string}
              user={user as User}
            />
          )}
        </Box>
        <Box sx={{ flex: '1', gap: '0.8rem', flexDirection: 'column', display: 'flex' }}>
          {currentCommunity && <About currentCommunity={currentCommunity} />}
          <ScrollToTop />
        </Box>
      </Container>
    </Box>
  );
};
export default PostPage;
