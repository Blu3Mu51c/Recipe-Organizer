const Recipe = require('../../models/recipe.js')

const dataController = {}

// Helper function: Capitalize the first letter of each word, lowercases rest
function capitalizeWords(str) {
  return str
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ')
}

// GET /recipes - List all recipes belonging to logged-in user
dataController.index = async (req, res, next) => {
  try {
    // Populate user's recipes (assumes req.user set by auth middleware)
    const user = await req.user.populate('recipes')
    res.locals.data.recipes = user.recipes
    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

// POST /recipes - Create new recipe and associate it with logged-in user
dataController.create = async (req, res, next) => {
  try {
    const recipe = await Recipe.create(req.body)
    res.locals.data.recipe = recipe
    // Add recipe's ID to user's recipes array without duplicates
    req.user.recipes.addToSet(recipe._id)
    await req.user.save()
    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

// GET /recipes/:id - Show details of a single recipe by ID
dataController.show = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
    if (!recipe) {
      throw new Error(`Could not find a recipe with id ${req.params.id}`)
    }
    res.locals.data.recipe = recipe
    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

// POST /recipes/:id/ingredients - Add an ingredient to a recipe
dataController.addIngredient = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
    if (!recipe) throw new Error('Recipe not found')

    recipe.ingredients.push({
      name: capitalizeWords(req.body.name),
      quantity: req.body.quantity,
      unit: capitalizeWords(req.body.unit),
      additional: capitalizeWords(req.body.additional),
    })

    await recipe.save()
    res.locals.data.recipe = recipe
    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

// DELETE /recipes/:recipeId/ingredients/:ingredientId - Remove an ingredient from a recipe
dataController.deleteIngredient = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId)
    if (!recipe) throw new Error('Recipe not found')

    // Use Mongoose pull method to remove ingredient by its ID
    recipe.ingredients.pull({ _id: req.params.ingredientId })
    await recipe.save()

    res.locals.data.recipe = recipe
    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

// PUT /recipes/:id - Update recipe details
dataController.update = async (req, res, next) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    )
    res.locals.data.recipe = updatedRecipe
    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

// DELETE /recipes/:id - Delete a recipe by ID
dataController.destroy = async (req, res, next) => {
  try {
    await Recipe.findOneAndDelete({ _id: req.params.id })
    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

module.exports = dataController
