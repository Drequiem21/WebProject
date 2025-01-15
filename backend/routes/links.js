const express = require('express');
const router = express.Router();
const Link = require('../models/link');
const auth = require('../middleware/auth');

// GET all links
router.get('/', async (req, res) => {
  try {
    const links = await Link.find();
    res.json(links);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// POST a new link (protected route)
router.post('/', auth, async (req, res) => {
  const { url, description, category } = req.body;

  if (!url || !description || !category) {
    return res.status(400).json({ msg: 'Please include all fields' });
  }

  try {
    const newLink = new Link({ url, description, category });
    const link = await newLink.save();
    res.json(link);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;