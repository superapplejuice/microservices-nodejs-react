const axios = require('axios');

const handleEvent = (posts, event) => {
  const { type, data } = event;

  if (type === 'PostCreated') {
    console.log('1. Adding created post...');

    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    console.log('1. Adding created comment...');

    const { id, content, postId, status } = data;
    const post = posts[postId];

    post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    console.log('1. Updating updated comment...');

    const { id, content, postId, status } = data;
    const post = posts[postId];
    const commentToUpdate = post.comments.find(comment => comment.id === id);

    commentToUpdate.status = status;
    commentToUpdate.content = content;
  }
};

const getEvents = async posts => {
  try {
    const { data } = await axios.get('http://localhost:4500/events');

    for (let event of data) {
      console.log('Processing event:', event.type);
      handleEvent(posts, event);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { handleEvent, getEvents };
