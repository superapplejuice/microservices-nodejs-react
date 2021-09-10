import React from 'react';
import { APPROVED_STATUS, PENDING_STATUS, REJECTED_STATUS } from '../constants';

const CommentList = ({ comments }) => {
  const getFontStyleFromStatus = (status) => {
    if (status === APPROVED_STATUS) {
      return 'normal';
    } else {
      return 'italic';
    }
  };

  const displayContentFromStatus = (status, content) => {
    switch (status) {
      case APPROVED_STATUS:
        return content;
      case REJECTED_STATUS:
        return 'Comment is rejected';
      case PENDING_STATUS:
        return 'Comment is awaiting moderation';
      default:
        return '';
    }
  };

  return (
    <div>
      <p>
        {comments.length} comment{comments.length === 1 ? '' : 's'}
      </p>
      <ul>
        {comments.map(({ id, content, status }) => (
          <li key={id} style={{ fontStyle: getFontStyleFromStatus(status) }}>
            {displayContentFromStatus(status, content)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
