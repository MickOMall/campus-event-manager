const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// GET all events with optional sorting
router.get('/', async (req, res) => {
  try {
    const sortBy = req.query.sort || 'createdAt'; // default sort by order entered
    let sortOption = {};

    if (sortBy === 'date') {
      sortOption.date = 1; // ascending by event date
    } else {
      sortOption.createdAt = 1; // ascending by creation time
    }

    const events = await Event.find().sort(sortOption);
    res.render('index', { events, currentSort: sortBy }); // pass currentSort to EJS
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// POST new event
router.post('/events', async (req, res) => {
  try {
    await Event.create(req.body);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating event');
  }
});

// GET edit form
router.get('/events/:id/edit', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.render('edit', { event });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching event');
  }
});

// PUT update event
router.put('/events/:id', async (req, res) => {
  try {
    await Event.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating event');
  }
});

// DELETE event
router.delete('/events/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting event');
  }
});

module.exports = router;
