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

const generateCommentCreatedEvent = async (commentData, res) => {
  try {
    await axios.post('http://localhost:4500/events', {
      type: 'CommentCreated',
      data: commentData,
    });
  } catch (err) {
    res.send(err.message);
  }
};

app.post('/posts/:id/comments', async (req, res) => {
  const generatedCommentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const postId = req.params.id;
  const postComments = commentsByPostId[postId] || [];
  const newComment = { id: generatedCommentId, content };

  postComments.push(newComment);
  commentsByPostId[postId] = postComments;

  await generateCommentCreatedEvent({ ...newComment, postId }, res);

  res.status(201).send(postComments);
});

app.post('/events', (req, res) => {
  console.log('Comments service received event:', req.body);
  res.send({ status: 'OK', ...req.body });
});

app.listen(4010, () => console.log('Comments service listening on 4010'));
