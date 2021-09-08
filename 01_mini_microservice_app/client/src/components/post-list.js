import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import { QUERY_URL } from '../constants';
import { generateNetworkError } from '../utils';

import PostCard from './post-card';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [fetchError, setFetchError] = useState('');

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(QUERY_URL);

      setPosts(Object.values(data));
    } catch (err) {
      setFetchError(generateNetworkError(err));
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {fetchError ? (
        <div style={{ color: 'red' }}>{fetchError}</div>
      ) : (
        <Fragment>
          <h2>Posts</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {posts.map(post => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default PostList;
