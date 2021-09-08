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
  console.log('Received event:', req.body);
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  } else if (type === 'CommentCreated') {
    const { id, content, postId } = data;
    const post = posts[postId];

    post.comments.push({ id, content });
  }

  res.send({ status: 'OK', ...req.body });
});

app.listen(4020, () => console.log('Query server listening on 4020'));
