const Recipe = require('../../models/recipe');

const dataController = {
  index: async (req, res, next) => {
    try {
      const recipes = await Recipe.find({});
      res.locals.data.recipes = recipes;
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = dataController;
