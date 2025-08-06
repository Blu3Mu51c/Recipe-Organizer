const Recipe = require('../../models/recipe');


//filters through all existing recipes
const dataController = {
  index: async (req, res, next) => {
    try {
      const { category, mealTime, name } = req.query;

      const filter = {};
      if (category) filter.category = category;
      if (mealTime) filter.mealTime = mealTime;
      if (name) filter.title = new RegExp(name, 'i');

      const recipes = await Recipe.find(filter);
      res.locals.data = { recipes };
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = dataController;
