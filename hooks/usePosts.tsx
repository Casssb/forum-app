import { collection, deleteDoc, doc, writeBatch } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, storage } from '../firebase/firebaseConfig';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import { Post, PostVote, deleteSinglePost } from '../redux/slices/postsSlice';

const usePosts = () => {
  const { posts, postVotes } = useAppSelector((state) => state.posts);
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
    try {
      const { numOfVotes } = post;
      const existingVote = postVotes.find((postVote) => postVote.postId === post.id);
      const batch = writeBatch(db);
      const updatedPost = { ...post };
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
        updatedPost.numOfVotes = numOfVotes + vote;
      } else {
        const postVoteRef = doc(db, 'users', `${user?.uid}/posVotes/${existingVote.id}`);
        if (existingVote.voteValue === vote) {
          updatedPost.numOfVotes = numOfVotes - vote;
        }
      }
    } catch (error: any) {
      console.log('error updating vote status', error.message);
    }
  };

  return {
    posts,
    deletePost,
  };
};
export default usePosts;
