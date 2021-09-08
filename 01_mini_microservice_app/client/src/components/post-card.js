import React from 'react';

import CommentCreate from './comment-create';
import CommentList from './comment-list';

const PostCard = ({ id, title, comments }) => (
  <div
    style={{
      padding: 16,
      borderColor: 'black',
      borderWidth: 1,
      borderStyle: 'solid',
      margin: 8,
      flexBasis: '20%',
    }}
  >
    <h4>{title}</h4>
    <hr/>
    <CommentList comments={comments}/>
    <hr/>
    <CommentCreate postId={id}/>
  </div>
);

export default PostCard;
