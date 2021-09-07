import React, { useState } from 'react';
import axios from 'axios';

import { COMMENTS_URL } from '../constants';
import { generateNetworkError } from '../utils';

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createComment = async () => {
    await axios.post(COMMENTS_URL.replace(':id', postId), { content });
    setContent('');
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      await createComment();

      setSubmitError('');
      setSubmitMessage('Comment posted successfully');
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      setSubmitMessage('');
      setSubmitError(generateNetworkError(err));
    }
  };

  return (
    <div style={{ marginTop: 16 }}>
      <form onSubmit={handleSubmit}>
        <h5>Add a comment</h5>
        <div>
          <label htmlFor="input-comment" style={{ fontSize: 14 }}>
            Comment
          </label>
          <input
            name="input-comment"
            type="text"
            value={content}
            onChange={e => {
              setContent(e.target.value);
              setSubmitMessage('');
            }}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
      {submitError && <div style={{ color: 'red' }}>{submitError}</div>}
      {submitMessage && <div style={{ color: 'green' }}>{submitMessage}</div>}
    </div>
  );
};

export default CommentCreate;
