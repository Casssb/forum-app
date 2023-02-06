import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { CommunityProps } from '../../redux/slices/communitySlice';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { Post, addPosts } from '../../redux/slices/postsSlice';

interface PostsProps {
  communityInfo: CommunityProps;
}

const Posts: React.FC<PostsProps> = ({ communityInfo }) => {
  const dispatch = useAppDispatch();
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
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLoading(false);
      dispatch(addPosts(posts as Post[]));
      console.log(posts);
    } catch (error: any) {
      console.log('firebase error getting posts', error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);
  return <div>Posts</div>;
};
export default Posts;
