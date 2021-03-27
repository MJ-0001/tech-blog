const router = require('express').Router();
const User = require('../models/User');

// Find all users
router.get('/user', async (req, res) => {
  try {
    const userData = await User.findAll();

      const users = userData.map((u) => {
        u.get({ plain: true });
      });

    res.status(200).render('u', { users })
  } catch(err) {
    res.status(500).json(err);
  }
});

// Update a record
router.put('/user/:id', async (req,res) => {
  try {
    const userData = await User.update({
      where: {
        id: req.params.id,
      }
    });

    res.status(200).json(userData);
  } catch(err) {
    res.status(500).json(err);
  }
});

// Delete a record
router.delete('/user/:id', async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      }
    });

    if (!userData) {
      res.status(404).json('No user id found!');
    }

    res.status(200).json(userData);
  } catch(err) {
    res.status(500).json(err);
  }
});

// Create a record
router.post('/user', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.status(200).json(userData);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;