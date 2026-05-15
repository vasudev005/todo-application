const Category = require('../models/Category');

const listCategories = async (req, res) => {
  const categories = await Category.find({ user: req.user._id }).sort({ createdAt: 1 });
  res.json({ categories });
};

const createCategory = async (req, res) => {
  const { name, color, icon } = req.body;
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  const category = await Category.create({
    user: req.user._id,
    name,
    slug,
    color,
    icon
  });

  res.status(201).json({ category });
};

module.exports = { listCategories, createCategory };
