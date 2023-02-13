import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Box } from '@mantine/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase/firebaseConfig';
import { CommunityProps } from '../../redux/slices/communitySlice';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { Post, addPosts } from '../../redux/slices/postsSlice';
import SinglePost from './SinglePost';
import PostSkeleton from './PostSkeleton';
import usePosts from '../../hooks/usePosts';

interface PostsProps {
  communityInfo: CommunityProps;
}

const Posts: React.FC<PostsProps> = ({ communityInfo }) => {
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const { posts, postVotes, deletePost, handleVote, selectPost } = usePosts();
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(db, 'posts'),
        where('communityId', '==', communityInfo.id),
        orderBy('createdAt', 'desc')
      );
      const postDocs = await getDocs(postQuery);
      const postData = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLoading(false);
      dispatch(addPosts(postData as Post[]));
    } catch (error: any) {
      console.log('firebase error getting posts', error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, [communityInfo]);
  return (
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
            />
          ))}
        </Box>
      )}
    </>
  );
};
export default Posts;
