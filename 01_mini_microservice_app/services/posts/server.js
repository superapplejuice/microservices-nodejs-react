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

app.post('/posts', async (req, res) => {
  const generatedPostId = randomBytes(4).toString('hex');
  const { title } = req.body;
  const newPost = { id: generatedPostId, title };

  posts[generatedPostId] = newPost;

  try {
    await axios.post('http://localhost:4500/events', {
      type: 'PostCreated',
      data: newPost,
    });
  } catch (err) {
    res.send(err.message);
  }

  res.status(201).send(posts[generatedPostId]);
});

app.listen(4000, () => console.log('Posts service listening on 4000'));
