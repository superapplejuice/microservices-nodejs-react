import React, { Fragment, useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import { COMMENTS_URL } from '../constants';
import { generateNetworkError } from '../utils';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [fetchError, setFetchError] = useState('');

  const fetchComments = useCallback(async () => {
    try {
      const { data } = await axios.get(COMMENTS_URL.replace(':id', postId));
      setComments(data);
    } catch (err) {
      setFetchError(generateNetworkError(err));
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div>
      {fetchError ? (
        <div style={{ color: 'red' }}>{fetchError}</div>
      ) : (
        <Fragment>
          <p>
            {comments.length} comment{comments.length === 1 ? '' : 's'}
          </p>
          <ul>
            {comments.map(comment => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
        </Fragment>
      )}
    </div>
  );
};

export default CommentList;
