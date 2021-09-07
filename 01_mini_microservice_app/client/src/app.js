import React from 'react';

import PostCreate from './components/post-create';
import PostList from './components/post-list';

const App = () => {
  return (
    <div>
      <PostCreate />
      <hr />
      <PostList />
    </div>
  );
};

export default App;
