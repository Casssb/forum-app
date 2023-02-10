import { collection, deleteDoc, doc, getDocs, query, where, writeBatch } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, storage } from '../firebase/firebaseConfig';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import {
  Post,
  PostVote,
  addNewPostVote,
  clearPostVotes,
  deletePostVote,
  deleteSinglePost,
  setPostVotes,
  updatePostVote,
  updatePostsArrayVoteValue,
} from '../redux/slices/postsSlice';
import { setAuthModalOpen, setAuthModalView } from '../redux/slices/authModalSlice';

const usePosts = () => {
  const { posts, postVotes } = useAppSelector((state) => state.posts);
  const { currentCommunity } = useAppSelector((state) => state.community);
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();

  const deletePost = async (post: Post): Promise<boolean> => {
    try {
      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      }

      const postDocRef = doc(db, 'posts', post.id!);
      await deleteDoc(postDocRef);
      dispatch(deleteSinglePost(post));
      return true;
    } catch (error: any) {
      console.log('Firebase error deleting post', error.message);
      return false;
    }
  };

  const handleVote = async (post: Post, vote: number, communityId: string) => {
    if (!user) {
      dispatch(setAuthModalOpen(true));
      dispatch(setAuthModalView('existing'));
      return;
    }

    try {
      const { numOfVotes } = post;
      const existingVote = postVotes.find((postVote) => postVote.postId === post.id);
      const batch = writeBatch(db);

      let voteChange = vote;

      if (!existingVote) {
        const postVoteRef = doc(collection(db, 'users', `${user?.uid}/postVotes`));

        const newVote: PostVote = {
          id: postVoteRef.id,
          postId: post.id!,
          communityId,
          voteValue: vote,
        };
        batch.set(postVoteRef, newVote);
        dispatch(updatePostsArrayVoteValue({ post, vote: numOfVotes + vote }));
        dispatch(addNewPostVote(newVote));
      } else {
        const postVoteRef = doc(db, 'users', `${user?.uid}/postVotes/${existingVote.id}`);

        if (existingVote.voteValue === vote) {
          voteChange *= -1;
          dispatch(updatePostsArrayVoteValue({ post, vote: numOfVotes - vote }));
          dispatch(deletePostVote(existingVote));
          batch.delete(postVoteRef);
        } else {
          voteChange = 2 * vote;
          dispatch(updatePostsArrayVoteValue({ post, vote: numOfVotes + 2 * vote }));
          dispatch(updatePostVote({ id: existingVote.id, vote }));
          batch.update(postVoteRef, {
            voteValue: vote,
          });
        }
      }

      const postRef = doc(db, 'posts', post.id!);
      batch.update(postRef, { numOfVotes: numOfVotes + voteChange });

      await batch.commit();
    } catch (error: any) {
      console.log('error updating vote status', error.message);
    }
  };

  const getCommunityPostVotes = async (communityId: string) => {
    const postVotesQuery = query(
      collection(db, 'users', `${user?.uid}/postVotes`),
      where('communityId', '==', communityId)
    );
    const postVotesDocs = await getDocs(postVotesQuery);
    const postVotesInfo = postVotesDocs.docs.map((elem) => ({
      id: elem.id,
      ...elem.data(),
    }));
    dispatch(setPostVotes(postVotesInfo as PostVote[]));
  };

  useEffect(() => {
    if (currentCommunity?.id && user) {
      getCommunityPostVotes(currentCommunity.id);
    }
  }, [user, currentCommunity]);

  useEffect(() => {
    if (!user) {
      dispatch(clearPostVotes());
    }
  }, [user]);

  return {
    posts,
    postVotes,
    deletePost,
    handleVote,
  };
};
export default usePosts;
