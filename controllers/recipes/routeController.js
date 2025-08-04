const express = require('express');
const router = express.Router();
const dataController = require('./dataController');
const viewController = require('./viewController');

// Index route (GET /recipes)
router.get('/', viewController.index);

// New recipe form (GET /recipes/new)
router.get('/new', viewController.new);

// Create recipe (POST /recipes)
router.post('/', dataController.createRecipe, viewController.redirectToShow);

// Show recipe (GET /recipes/:id)
router.get('/:id', viewController.show);

// Edit form (GET /recipes/:id/edit)
router.get('/:id/edit', viewController.edit);

// Update recipe (PUT /recipes/:id)
router.put('/:id', dataController.updateRecipe, viewController.redirectToEdit);

// Add ingredient (POST /recipes/:id/ingredients)
router.post('/:id/ingredients', dataController.addIngredient, viewController.redirectToEdit);

// Delete ingredient (DELETE /recipes/:id/ingredients/:ingId)
router.delete('/:id/ingredients/:ingId', dataController.deleteIngredient, viewController.redirectToEdit);

// Delete recipe (DELETE /recipes/:id)
router.delete('/:id', dataController.deleteRecipe, viewController.redirectToIndex);

module.exports = router;
