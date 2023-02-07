import { useAppSelector } from '../redux/hooks/hooks';

const usePosts = () => {
  const { posts } = useAppSelector((state) => state.posts);

  return {
    posts,
  };
};
export default usePosts;
