import { Box, Container } from '@mantine/core';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import About from '../../../../components/Community/About';
import SinglePost from '../../../../components/Posts/SinglePost';
import { auth } from '../../../../firebase/firebaseConfig';
import usePosts from '../../../../hooks/usePosts';

const PostPage: React.FC = () => {
  const { posts, postVotes, selectedPost, deletePost, handleVote } = usePosts();
  const [user] = useAuthState(auth);
  return (
    <Box>
      <Container size="xl" sx={{ display: 'flex', gap: '1rem' }}>
        <Box sx={{ flex: '3' }}>
          {selectedPost && (
            <SinglePost
              post={selectedPost}
              userIsOwner={user?.uid === selectedPost.creator}
              userVote={postVotes.find((vote) => vote.postId === selectedPost.id)?.voteValue}
              deletePost={deletePost}
              handleVote={handleVote}
            />
          )}
        </Box>
        <Box sx={{ border: '2px solid green', flex: '1' }}>
          {/* <About /> */}
        </Box>
      </Container>
    </Box>
  );
};
export default PostPage;
