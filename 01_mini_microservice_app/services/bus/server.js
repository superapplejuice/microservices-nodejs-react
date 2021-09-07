const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/events', async (req, res) => {
  // The whole request body contains the event
  const event = req.body;

  try {
    await axios.post('https://localhost:4000/events', event);
    await axios.post('https://localhost:4010/events', event);
    await axios.post('https://localhost:4020/events', event);

    res.status(200).send({ status: 'OK' });
  } catch (err) {
    res.send(err.message);
  }
});

app.listen(4500, () => console.log('Event bus listening on port 4500'));
