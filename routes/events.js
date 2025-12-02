const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// GET all events with optional sorting
router.get('/', async (req, res) => {
  try {
    const sortBy = req.query.sort || 'createdAt';
    let sortOption = {};

    if (sortBy === 'date') {
      sortOption.date = 1; // ascending by event date
    } else {
      sortOption.createdAt = 1; // ascending by creation time
    }

    const events = await Event.find().sort(sortOption);
    res.render('index', { events, currentSort: sortBy });
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

// GET edit form for an existing event (separate page)
router.get('/events/:id/edit', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).send('Event not found');
    res.render('edit', { event }); // pass event to edit.ejs
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching event');
  }
});

// PUT update event
router.put('/events/:id', async (req, res) => {
  try {
    await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
