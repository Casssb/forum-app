import { deleteObject, ref } from 'firebase/storage';
import { deleteDoc, doc } from 'firebase/firestore';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import { Post, deleteSinglePost } from '../redux/slices/postsSlice';
import { db, storage } from '../firebase/firebaseConfig';

const usePosts = () => {
  const { posts } = useAppSelector((state) => state.posts);
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

  return {
    posts,
    deletePost,
  };
};
export default usePosts;
