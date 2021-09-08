const handlePostCreated = (postData, posts) => {
  console.log('1. Adding created post...');

  const { id, title } = postData;

  posts[id] = { id, title, comments: [] };

  return posts;
};

const handleCommentCreated = (commentData, posts) => {
  console.log('1. Adding created comment...');

  const { id, content, postId, status } = commentData;
  const post = posts[postId];

  post.comments.push({ id, content, status });

  return posts;
};

const handleCommentUpdated = (updatedCommentData, posts) => {
  console.log('1. Updating updated comment...');

  const { id, postId } = updatedCommentData;
  const post = posts[postId];

  post.comments.map(comment =>
    comment.id === id ? { ...comment, ...updatedCommentData } : comment,
  );

  return posts;
};

module.exports = { handlePostCreated, handleCommentCreated, handleCommentUpdated };
