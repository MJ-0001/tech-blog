const sequelize = require('../config/connection');
const { User, Blog } = require('../models');

const userData = require('./userData.js');
const blogData = require('./blogData.js');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const user = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogData) {
    await Blog.create({
      ...blog,
      user_id: user[Math.floor(Math.random() * user.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();