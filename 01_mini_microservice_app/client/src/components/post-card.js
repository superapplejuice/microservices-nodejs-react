import React from 'react';

import CommentCreate from './comment-create';
import CommentList from './comment-list';

const PostCard = post => {
  return (
    <div
      style={{
        width: '30%',
        padding: 16,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        margin: 8,
      }}
    >
      <h4>{post.title}</h4>
      <hr />
      <CommentList postId={post.id} />
      <hr />
      <CommentCreate postId={post.id} />
    </div>
  );
};

export default PostCard;
