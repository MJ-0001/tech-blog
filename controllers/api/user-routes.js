const router = require('express').Router();
const User = require('../../models/User');

// // Find all users
// router.get('/user', async (req, res) => {
//   try {
//     const userData = await User.findAll();

//       const users = userData.map((u) => {
//         u.get({ plain: true });
//       });

//     res.status(200).render('u', { users })
//   } catch(err) {
//     res.status(500).json(err);
//   }
// });

// // Find one user
// router.get('/user/:id', async (req, res) => {
//   try {
//     const userData = await User.findByPk(req.params.id);

//     if (!userData) {
//       res.status(404).json('No user found!');
//     }

//     const user = userData.get({ plain: true });

//     res.status(200).render('a hdb page', { user });
//   } catch(err) {
//     res.status(500).json(err);
//   }
// });

// // Create a user
// router.post('/user', async (req, res) => {
//   try {
//     const userData = await User.create(req.body);
//     res.status(200).json(userData);
//   } catch(err) {
//     res.status(500).json(err);
//   }
// });

// // Update a user
// router.put('/user/:id', async (req,res) => {
//   try {
//     const userData = await User.update(req.body, {
//       where: {
//         id: req.params.id,
//       }
//     });

//     res.status(200).json(userData);
//   } catch(err) {
//     res.status(500).json(err);
//   }
// });

// // Delete a user
// router.delete('/user/:id', async (req, res) => {
//   try {
//     const userData = await User.destroy({
//       where: {
//         id: req.params.id,
//       }
//     });

//     if (!userData) {
//       res.status(404).json('No user id found!');
//     }

//     res.status(200).json('Record successfully removed!');
//   } catch(err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;