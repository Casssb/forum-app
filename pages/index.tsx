import { Box, Container } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import PostSkeleton from '../components/Posts/PostSkeleton';
import { auth, db } from '../firebase/firebaseConfig';
import { useAppDispatch } from '../redux/hooks/hooks';
import { Post, PostVote, addPosts, clearPostVotes, setPostVotes } from '../redux/slices/postsSlice';
import SinglePost from '../components/Posts/SinglePost';
import usePosts from '../hooks/usePosts';
import useCommunityInfo from '../hooks/useCommunityInfo';
import FredditPremium from '../components/HomeComponents/FredditPremium';
import HomeInfo from '../components/HomeComponents/HomeInfo';
import TopCommunites from '../components/HomeComponents/TopCommunites';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import PostFilter from '../components/PostFilter/PostFilter';

export default function HomePage() {
  const isSmall = useMediaQuery('(max-width: 900px)');
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const { posts, postVotes, deletePost, handleVote, selectPost } = usePosts();
  const { userCommunityInfo } = useCommunityInfo();
  const dispatch = useAppDispatch();

  const createNonUserPostsFeed = async () => {
    try {
      setLoading(true);
      const postQuery = query(collection(db, 'posts'), orderBy('numOfVotes', 'desc'), limit(10));
      const postDocs = await getDocs(postQuery);
      const sortedPosts = postDocs.docs.map((post) => ({
        id: post.id,
        ...post.data(),
      }));
      dispatch(addPosts(sortedPosts as Post[]));
    } catch (error: any) {
      console.log('error building home feed (non-user)', error.message);
    }
    setLoading(false);
  };

  const createUserPostsFeed = async () => {
    try {
      setLoading(true);
      if (userCommunityInfo.length) {
        const userCommunityIds = userCommunityInfo.map((community) => community.communityId);
        const postQuery = query(
          collection(db, 'posts'),
          where('communityId', 'in', userCommunityIds),
          limit(10)
        );
        const postDocs = await getDocs(postQuery);
        const sortedPosts = postDocs.docs.map((post) => ({
          id: post.id,
          ...post.data(),
        }));
        dispatch(addPosts(sortedPosts as Post[]));
      } else {
        createNonUserPostsFeed();
      }
    } catch (error: any) {
      console.log('Firebase error building home feed (user)', error.message);
    }
    setLoading(false);
  };

  const getHomeFeedPostVotes = async () => {
    try {
      const postIds = posts.map((post) => post.id);
      const postVotesQuery = query(
        collection(db, `users/${user?.uid}/postVotes`),
        where('postId', 'in', postIds)
      );
      const postVotesDocs = await getDocs(postVotesQuery);
      const posVotes = postVotesDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setPostVotes(posVotes as PostVote[]));
    } catch (error: any) {
      console.log('Firebase error on home page getting post votes', error.message);
    }
  };

  useEffect(() => {
    if (!user && !loadingUser) {
      createNonUserPostsFeed();
    }
    if (user && !loadingUser) {
      createUserPostsFeed();
    }
  }, [user, loadingUser]);

  useEffect(() => {
    if (user && posts.length) {
      getHomeFeedPostVotes();
    }
    return () => {
      dispatch(clearPostVotes());
    };
  }, [user, posts]);

  return (
    <Box>
      <Container
        size="xl"
        sx={{
          display: 'flex',
          gap: '1rem',
          flexDirection: `${isSmall ? 'column' : 'row'}`,
          marginTop: '0.8rem',
        }}
      >
        <Box sx={{ flex: '3', marginTop: '0.2rem' }}>
          <PostFilter />
          <>
            {loading ? (
              <PostSkeleton />
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8rem',
                  marginTop: '0.8rem',
                  height: 'max-content',
                }}
              >
                {posts.map((post) => (
                  <SinglePost
                    post={post}
                    userIsOwner={user?.uid === post.creator}
                    userVote={postVotes.find((vote) => vote.postId === post.id)?.voteValue}
                    key={post.id}
                    deletePost={deletePost}
                    handleVote={handleVote}
                    selectPost={selectPost}
                    isHomePage
                  />
                ))}
              </Box>
            )}
          </>
        </Box>
        <Box
          sx={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
            marginTop: '0.2rem',
          }}
        >
          <FredditPremium />
          <HomeInfo />
          <TopCommunites />
          <ScrollToTop />
        </Box>
      </Container>
    </Box>
  );
}
