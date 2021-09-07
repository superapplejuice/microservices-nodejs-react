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
    res.status(400).send(err.message);
  }
});

app.listen(4500, () => console.log('Listening on 4500'));
