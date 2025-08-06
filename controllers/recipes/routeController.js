const express = require('express')
const router = express.Router()

const viewController = require('./viewController.js')
const dataController = require('./dataController.js')
const authDataController = require('../authentication/dataController.js')

// Protect all routes with auth middleware (ensures user is logged in)

// GET /recipes/ - List all recipes for the logged-in user
router.get(
  '/',
  authDataController.auth,
  dataController.index,
  viewController.index
)

// GET /recipes/new - Show form to create a new recipe
router.get('/new', authDataController.auth, viewController.newView)

// DELETE /recipes/:id - Delete a recipe and all its ingredients
router.delete('/:id', authDataController.auth, dataController.destroy, viewController.redirectHome)

// PUT /recipes/:id - Update recipe details
router.put('/:id', authDataController.auth, dataController.update, viewController.redirectShow)

// POST /recipes/ - Create a new recipe, then redirect to edit page
router.post('/', authDataController.auth, dataController.create, viewController.redirectEdit)

// POST /recipes/:id/ingredients - Add a new ingredient to a recipe
router.post('/:id/ingredients', authDataController.auth, dataController.addIngredient, viewController.redirectEdit)

// DELETE /recipes/:recipeId/ingredients/:ingredientId - Remove an ingredient from a recipe
router.delete(
  '/:recipeId/ingredients/:ingredientId', authDataController.auth, dataController.deleteIngredient, viewController.redirectEdit)

// GET /recipes/:id/edit - Show edit page for a recipe (includes ingredients)
router.get('/:id/edit', authDataController.auth, dataController.show, viewController.edit)

// GET /recipes/:id - Show details of a single recipe
router.get('/:id', authDataController.auth, dataController.show, viewController.show)

module.exports = router
