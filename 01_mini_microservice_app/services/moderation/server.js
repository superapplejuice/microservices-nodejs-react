const express = require('express');
const axios = require('axios');

const { BANNED_WORDS, REJECTED_STATUS, APPROVED_STATUS } = require('./constants');

const app = express();
app.use(express.json());

const generateCommentModeratedEvent = async (commentData, res) => {
  try {
    await axios.post('http://localhost:4500/events', {
      type: 'CommentModerated',
      data: commentData,
    });
  } catch (err) {
    res.send(err.message);
  }
};

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  console.log('Moderation event received event:', type);

  if (type === 'CommentCreated') {
    console.log('1. Moderating comment...');
    const newStatus = BANNED_WORDS.some(word => data.content.includes(word))
      ? REJECTED_STATUS
      : APPROVED_STATUS;

    console.log('2. Generating CommentModerated event...');
    await generateCommentModeratedEvent({ ...data, status: newStatus }, res);

    console.log('3. Comment moderated!');
    res.status(202).send({ status: 'OK' });
  } else {
    res.send({ status: 'OK', ...req.body });
  }
});

app.listen(4015, () => console.log('Moderation service listening on 4015'));
