const Category = require('../models/Category');
const Task = require('../models/Task');

const DEFAULT_CATEGORIES = [
  { name: 'Personal', slug: 'personal', color: '#8B5CF6', icon: 'UserRound' },
  { name: 'Work', slug: 'work', color: '#3B82F6', icon: 'Briefcase' },
  { name: 'Learning', slug: 'learning', color: '#14B8A6', icon: 'GraduationCap' },
  { name: 'Fitness', slug: 'fitness', color: '#F97316', icon: 'Dumbbell' }
];

const createDefaultWorkspace = async (userId) => {
  const categories = await Category.insertMany(
    DEFAULT_CATEGORIES.map((item) => ({ ...item, user: userId }))
  );

  const categoryMap = categories.reduce((acc, category) => {
    acc[category.slug] = category._id;
    return acc;
  }, {});

  const today = new Date();
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const later = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

  await Task.insertMany([
    {
      user: userId,
      title: 'Design landing page hero refresh',
      description: 'Polish the dashboard hero, CTA spacing, and testimonial layout.',
      priority: 'high',
      status: 'in-progress',
      dueDate: today,
      labels: ['design', 'frontend'],
      category: categoryMap.work,
      categorySlug: 'work',
      position: 1,
      subtasks: [
        { title: 'Review SaaS inspiration', completed: true },
        { title: 'Update CTA section', completed: false }
      ]
    },
    {
      user: userId,
      title: 'Prepare React Router revision notes',
      description: 'Summarize loaders, protected routes, and nested layouts.',
      priority: 'medium',
      status: 'todo',
      dueDate: tomorrow,
      labels: ['study', 'react'],
      category: categoryMap.learning,
      categorySlug: 'learning',
      position: 2
    },
    {
      user: userId,
      title: 'Leg day and mobility session',
      description: '45 minutes strength + stretching cooldown.',
      priority: 'medium',
      status: 'todo',
      dueDate: later,
      labels: ['wellness'],
      category: categoryMap.fitness,
      categorySlug: 'fitness',
      position: 3
    },
    {
      user: userId,
      title: 'Plan weekend reading sprint',
      description: 'Block two focused sessions for product strategy reading.',
      priority: 'low',
      status: 'completed',
      completedAt: new Date(),
      dueDate: today,
      labels: ['reading'],
      category: categoryMap.personal,
      categorySlug: 'personal',
      position: 4
    }
  ]);
};

module.exports = { createDefaultWorkspace, DEFAULT_CATEGORIES };
