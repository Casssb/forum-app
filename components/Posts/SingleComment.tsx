import { Card } from '@mantine/core';
import React from 'react';
import { Comment } from './CommentForm';

interface SingleCommentProps {
  userId?: string;
  comment: Comment;
}

const SingleComment: React.FC<SingleCommentProps> = ({ userId, comment }) => {
  const deleteComment = async (comment: Comment) => {};
  return <Card>Single comment {comment.body}</Card>;
};
export default SingleComment;
