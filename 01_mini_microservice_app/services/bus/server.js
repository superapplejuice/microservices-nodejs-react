const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const events = [];
const serviceUrls = [
  {
    name: 'Posts',
    url: 'http://localhost:4000/events',
  },
  {
    name: 'Comments',
    url: 'http://localhost:4010/events',
  },
  {
    name: 'Query',
    url: 'http://localhost:4020/events',
  },
  {
    name: 'Moderation',
    url: 'http://localhost:4030/events',
  },
];

const failedServiceError = serviceName => {
  console.error(`${serviceName} service not running`);
};

app.post('/events', async (req, res) => {
  console.log('Event bus received event:', req.body.type);

  // Assume the whole request body contains the event
  const event = req.body;
  events.push(event);

  console.log('1. Sending event to services...');
  for (const { name, url } of serviceUrls) {
    await axios.post(url, event).catch(() => failedServiceError(name));
  }

  console.log('2. Events sent to available services!');
  res.send({ status: 'OK', message: 'Events sent' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4500, () => console.log('Event bus listening on port 4500'));
