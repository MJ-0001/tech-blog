const router = require('express').Router();
const Blog = require('../../models/Blog');
const withAuth = require('../../utils/auth');

// // Find all blogs
// router.get('/blog', async (req, res) => {
//   try {
//     const blogData = await Blog.findAll();

//       const blogs = blogData.map((b) => {
//         b.get({ plain: true });
//       });

//     res.status(200).render('blog', { blogs })
//   } catch(err) {
//     res.status(500).json(err);
//   }
// });

// // Find one blog
// router.get('/blog/:id', async (req, res) => {
//   try {
//     const blogData = await Blog.findByPk(req.params.id);

//     if (!blogData) {
//       res.status(404).json('No blog found!');
//     }

//     const blog = blogData.get({ plain: true });

//     res.status(200).render('a hdb page', { blog });
//   } catch(err) {
//     res.status(500).json(err);
//   }
// });

// // Create a blog
// router.post('/blog', async (req, res) => {
//   try {
//     const blogData = await Blog.create(req.body);
//     res.status(200).json(blogData);
//   } catch(err) {
//     res.status(500).json(err);
//   }
// });

// // Update a blog
// router.put('/blog/:id', async (req,res) => {
//   try {
//     const blogData = await Blog.update(req.body, {
//       where: {
//         id: req.params.id,
//       }
//     });

//     res.status(200).json(blogData);
//   } catch(err) {
//     res.status(500).json(err);
//   }
// });

// // Delete a blog
// router.delete('/blog/:id', async (req, res) => {
//   try {
//     const blogData = await Blog.destroy({
//       where: {
//         id: req.params.id,
//       }
//     });

//     if (!blogData) {
//       res.status(404).json('No blog id found!');
//     }

//     res.status(200).json('Record successfully removed!');
//   } catch(err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with that id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

