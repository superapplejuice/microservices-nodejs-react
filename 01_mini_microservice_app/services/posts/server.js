const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

const generatePostCreatedEvent = async (newPost, res) => {
  try {
    await axios.post('http://localhost:4500/events', {
      type: 'PostCreated',
      data: newPost,
    });
  } catch (err) {
    res.send(err.message);
  }
};

app.post('/posts', async (req, res) => {
  console.log('1. Creating post...');

  const generatedPostId = randomBytes(4).toString('hex');
  const { title } = req.body;
  const newPost = { id: generatedPostId, title };

  posts[generatedPostId] = newPost;
  console.log('2. Generating PostCreated event...');
  await generatePostCreatedEvent(newPost, res);

  console.log('3. Post created!');
  res.status(201).send(posts[generatedPostId]);
});

app.post('/events', (req, res) => {
  console.log('Posts service received event:', req.body.type);
  res.send({ status: 'OK', message: 'Event received' });
});

app.listen(4000, () => console.log('Posts service listening on 4000'));
