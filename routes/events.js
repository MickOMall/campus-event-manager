const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// GET all events
router.get('/', async (req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.render('index', { events });
});

// POST create new event
router.post('/events', async (req, res) => {
  try {
    await Event.create(req.body); // date will cast automatically
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET edit form
router.get('/events/:id/edit', async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.render('edit', { event });
});

// PUT update event
router.put('/events/:id', async (req, res) => {
  try {
    await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// DELETE event
router.delete('/events/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
