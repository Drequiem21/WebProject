const express = require('express');
const router = express.Router();
const Exhibition = require('../models/exhibition');
const auth = require('../middleware/auth');

// GET all exhibitions
router.get('/', async (req, res) => {
  try {
    const exhibitions = await Exhibition.find();
    res.json(exhibitions);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// POST a new exhibition (protected route)
router.post('/', auth, async (req, res) => {
  const { title, date, location } = req.body;

  if (!title || !date || !location) {
    return res.status(400).json({ msg: 'Please include all fields' });
  }

  try {
    const newExhibition = new Exhibition({ title, date, location });
    const exhibition = await newExhibition.save();
    res.json(exhibition);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;