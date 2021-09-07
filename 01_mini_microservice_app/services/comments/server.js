const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const generatedCommentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const postId = req.params.id;
  const postComments = commentsByPostId[postId] || [];
  const newComment = { id: generatedCommentId, content };

  postComments.push(newComment);
  commentsByPostId[postId] = postComments;

  try {
    await axios.post('http://localhost:4500/events', {
      type: 'CommentCreated',
      data: { ...newComment, postId },
    });
  } catch (err) {
    res.send(err.message);
  }

  res.status(201).send(postComments);
});

app.listen(4010, () => console.log('Comments service listening on 4010'));
