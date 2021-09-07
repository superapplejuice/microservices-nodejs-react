import React, { useState } from 'react';
import axios from 'axios';

import { POSTS_URL } from '../constants';
import { generateNetworkError } from '../utils';

const PostCreate = () => {
  const [title, setTitle] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createPost = async () => {
    await axios.post(POSTS_URL, { title });
    setTitle('');
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      await createPost();

      setSubmitError('');
      setSubmitMessage('Post created successfully');
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      setSubmitMessage('');
      setSubmitError(generateNetworkError(err));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Create a Post</h3>
        <div>
          <label htmlFor="input-title">Post title</label>
          <input
            name="input-title"
            type="text"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
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

export default PostCreate;
