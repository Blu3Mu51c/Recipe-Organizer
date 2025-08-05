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

// GET / (home page) - public, shows all recipes from all users
dataController.browse = async (req, res, next) => {
  try {
    const recipes = await Recipe.find(); // gets all recipes
    res.locals.data.recipes = recipes;
    next();
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

// GET /recipes - list recipes for logged-in user
dataController.index = async (req, res, next) => {
  try {
    const user = await req.user.populate('recipes');
    res.locals.data.recipes = user.recipes;
    next();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// POST /recipes - create new recipe for logged-in user
dataController.create = async (req, res, next) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.locals.data.recipe = recipe;
    req.user.recipes.addToSet(recipe._id);
    await req.user.save();
    next();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// GET /recipes/:id - show one recipe
dataController.show = async (req, res, next) => {
  try {
    res.locals.data.recipe = await Recipe.findById(req.params.id);
    if (!res.locals.data.recipe) {
      throw new Error(`Could not find a recipe with id ${req.params.id}`);
    }
    next();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};


// Add an ingredient to a recipe
dataController.addIngredient = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) throw new Error('Recipe not found');

    recipe.ingredients.push({
      name: req.body.name,
      quantity: req.body.quantity,
      unit: req.body.unit,
      additional: req.body.additional,
    });

    await recipe.save();
    res.locals.data.recipe = recipe;
    next();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Delete an ingredient from a recipe
dataController.deleteIngredient = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe) throw new Error('Recipe not found');

    // Remove the ingredient by filtering it out
    recipe.ingredients.pull({ _id: req.params.ingredientId });
    await recipe.save();

    res.locals.data.recipe = recipe;
    next();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// PUT /recipes/:id - update a recipe
dataController.update = async (req, res, next) => {
  try {
    res.locals.data.recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    next();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// DELETE /recipes/:id - delete a recipe
dataController.destroy = async (req, res, next) => {
  try {
    await Recipe.findOneAndDelete({ _id: req.params.id });
    next();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = dataController;
