import React from 'react';

const CommentList = ({ comments }) => (
  <div>
    <p>
      {comments.length} comment{comments.length === 1 ? '' : 's'}
    </p>
    <ul>
      {comments.map(comment => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  </div>
);

export default CommentList;
