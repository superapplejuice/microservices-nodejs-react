const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const generatedCommentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const postId = req.params.id;
  const postComments = commentsByPostId[postId] || [];

  postComments.push({ id: generatedCommentId, content });
  commentsByPostId[postId] = postComments;

  res.status(201).send(postComments);
});

app.listen(4010, () => console.log('Listening on 4010'));
