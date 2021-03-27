const router = require('express').Router();
const userRoute = require('./user-routes');
const blogRoute = require('./blog-routes');

router.use('/users', userRoute);
router.use('/blogs', blogRoute);

module.exports = router;