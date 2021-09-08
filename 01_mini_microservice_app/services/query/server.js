const express = require('express');
const cors = require('cors');

const {
  handlePostCreated,
  handleCommentCreated,
  handleCommentUpdated,
} = require('./event-handlers');

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
let posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  console.log('Query service received event:', type);

  if (type === 'PostCreated') {
    posts = { ...posts, ...handlePostCreated(data, posts) };
  }

  if (type === 'CommentCreated') {
    posts = { ...posts, ...handleCommentCreated(data, posts) };
  }

  if (type === 'CommentUpdated') {
    posts = { ...posts, ...handleCommentUpdated(data, posts) };
  }

  console.log('2. Query complete!');
  res.send({ status: 'OK', ...req.body });
});

app.listen(4020, () => console.log('Query server listening on 4020'));
