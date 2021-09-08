const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/events', async (req, res) => {
  console.log('Event bus received event:', req.body.type);

  // Assume the whole request body contains the event
  const event = req.body;

  try {
    console.log('1. Sending event to services...');

    await axios.post('http://localhost:4000/events', event);
    await axios.post('http://localhost:4010/events', event);
    await axios.post('http://localhost:4015/events', event);
    await axios.post('http://localhost:4020/events', event);

    console.log('2. Events sent!');
    res.status(200).send({ status: 'OK' });
  } catch (err) {
    res.send(err.message);
  }
});

app.listen(4500, () => console.log('Event bus listening on port 4500'));
