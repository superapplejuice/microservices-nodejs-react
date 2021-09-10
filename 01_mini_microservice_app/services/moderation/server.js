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
    res.send({ status: 'Error', message: err.message });
  }
};

app.post('/events', async (req, res) => {
  const {
    type,
    data: { id, postId, content },
  } = req.body;
  console.log('Moderation service received event:', type);

  if (type === 'CommentCreated') {
    console.log('1. Moderating comment...');
    const newStatus = BANNED_WORDS.some(word => content.includes(word))
      ? REJECTED_STATUS
      : APPROVED_STATUS;

    console.log('2. Generating CommentModerated event...');
    const commentData = {
      id,
      postId,
      content,
      status: newStatus,
    };
    await generateCommentModeratedEvent(commentData, res);

    console.log('3. Comment moderated!');
    res.send({ status: 'OK', message: 'Comment moderated' });
  } else {
    res.send({ status: 'OK', message: 'Event received' });
  }
});

app.listen(4030, () => console.log('Moderation service listening on 4030'));
