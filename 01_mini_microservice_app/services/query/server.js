const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

/**
 * type Post = {
 *   [key: string]: {
 *     id: string,
 *     title: string,
 *     comments: [{
 *       id: string,
 *       title: string
 *     }]
 *   }
 * };
 */
const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  console.log('Query service received event:', type);

  if (type === 'PostCreated') {
    console.log('1. Adding created post...');
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  } else if (type === 'CommentCreated') {
    console.log('1. Adding created comment...');
    const { id, content, postId, status } = data;
    const post = posts[postId];

    post.comments.push({ id, content, status });
  }

  console.log('2. Query complete!');
  res.send({ status: 'OK', ...req.body });
});

app.listen(4020, () => console.log('Query server listening on 4020'));
