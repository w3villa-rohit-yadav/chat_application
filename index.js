const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();



const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Proxy Server is running');
});

app.post('/api/chat', async (req, res) => {
  
  const url = 'https://api.corcel.io/v1/text/cortext/chat';
  

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.API_KEY}`, 
    },
    body: JSON.stringify(req.body),
  };

  try {
    const apiRes = await fetch(url, options); 
    const content = await apiRes.json();
    res.json(content);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing request');
  }
});

app.post('/api/generate-image', async (req, res) => { 
  const url = 'https://api.corcel.io/v1/image/cortext/text-to-image';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.API_KEY}`, 
    },
    body: JSON.stringify(req.body),
  };

  try {
    const apiRes = await fetch(url, options);
    const data = await apiRes.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing request');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
