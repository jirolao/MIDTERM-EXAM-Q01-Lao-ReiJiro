const express = require('express');
const fs = require('fs').promises;
const app = express();

app.use(express.json());
app.use(express.static('public'));

const FILE = './data.json';

// GET all
app.get('/api/requests', async (req, res) => {
  const data = JSON.parse(await fs.readFile(FILE, 'utf8'));
  res.json(data);
});

// GET one
app.get('/api/requests/:id', async (req, res) => {
  const data = JSON.parse(await fs.readFile(FILE, 'utf8'));
  const item = data.find(r => r.id === req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
});

// POST new
app.post('/api/requests', async (req, res) => {
  const data = JSON.parse(await fs.readFile(FILE, 'utf8'));
  const newReq = {
    id: req.body.id || Date.now().toString(),
    requester: req.body.requester,
    location: req.body.location,
    problem: req.body.problem,
    priority: req.body.priority,
    status: "Pending"
  };
  data.push(newReq);
  await fs.writeFile(FILE, JSON.stringify(data, null, 2));
  res.status(201).json(newReq);
});

// DELETE
app.delete('/api/requests/:id', async (req, res) => {
  const data = JSON.parse(await fs.readFile(FILE, 'utf8'));
  const filtered = data.filter(r => r.id !== req.params.id);
  if (data.length === filtered.length) return res.status(404).json({ message: 'Not found' });
  await fs.writeFile(FILE, JSON.stringify(filtered, null, 2));
  res.json({ message: 'Deleted' });
});

app.listen(3000, () => console.log('Running on port 3000'));
