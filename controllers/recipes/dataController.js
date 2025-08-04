const Recipe = require('../../models/recipe.js')

const dataController={}

function capitalizeWords(str) {
  return str
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

dataController.createRecipe = async (req, res, next) => {
    try {
      const { title, description, instructions } = req.body;
      req.recipe = await Recipe.create({ title, description, instructions, ingredients: [] });
      next();
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

dataController.updateRecipe = async (req, res, next) => {
  try {
    const { title, description, instructions, category, mealTime } = req.body;
    await Recipe.findByIdAndUpdate(req.params.id, {
      title,
      description,
      instructions,
      category,    // New field
      mealTime,    // New field
    });
    next();
  } catch (err) {
    res.status(400).send(err.message);
  }
};

  dataController.addIngredient = async (req, res, next) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      recipe.ingredients.push({
        name: capitalizeWords(req.body.name),
        quantity: req.body.quantity,
        unit: (req.body.unit || '').toLowerCase(),
        additional: capitalizeWords(req.body.additional || '')
      });
      await recipe.save();
      next();
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  dataController.deleteIngredient = async (req, res, next) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      recipe.ingredients = recipe.ingredients.filter(
        ing => ing._id.toString() !== req.params.ingId
      );
      await recipe.save();
      next();
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  dataController.deleteRecipe= async (req, res, next) => {
    try {
      await Recipe.findByIdAndDelete(req.params.id);
      next();
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  module.exports = dataController