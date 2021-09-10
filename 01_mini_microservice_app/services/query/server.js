const express = require('express');
const cors = require('cors');

const { handleEvent, getEvents } = require('./event-handlers');

const app = express();
app.use(express.json());
app.use(cors());

/**
 * type Post = {
 *   [postId: string]: {
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
  console.log('Query service received event:', req.body.type);

  handleEvent(posts, req.body);

  console.log('2. Query complete!');
  res.send({ status: 'OK', message: 'Query complete' });
});

app.listen(4020, async () => {
  console.log('Query server listening on 4020');

  await getEvents(posts);
});
