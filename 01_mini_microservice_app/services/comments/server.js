const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const { PENDING_STATUS } = require('./constants');

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
  console.log('1. Creating comment...');

  const generatedCommentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const postId = req.params.id;
  const postComments = commentsByPostId[postId] || [];
  const newComment = { id: generatedCommentId, content, status: PENDING_STATUS };

  postComments.push(newComment);
  commentsByPostId[postId] = postComments;

  console.log('2. Generating CommentCreated event...');
  await generateCommentCreatedEvent({ ...newComment, postId }, res);

  console.log('3. Comment created!');
  res.status(201).send(postComments);
});

const generateCommentUpdatedEvent = async (commentToUpdate, res) => {
  try {
    await axios.post('http://localhost:4500/events', {
      type: 'CommentUpdated',
      data: commentToUpdate,
    });
  } catch (err) {
    res.send(err);
  }
};

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  console.log('Comments service received event:', type);

  if (type === 'CommentModerated') {
    console.log('1. Updating moderated comment status...');

    const { postId, id, status } = data;
    const comments = commentsByPostId[postId];
    const commentToUpdate = comments.find(comment => comment.id === id);

    commentToUpdate.status = status;

    console.log('2. Generating CommentUpdated event...');
    await generateCommentUpdatedEvent(commentToUpdate, res);

    console.log('3. Comment updated!');
    res.send({ status: 'OK' });
  } else {
    res.send({ status: 'OK', ...req.body });
  }
});

app.listen(4010, () => console.log('Comments service listening on 4010'));
