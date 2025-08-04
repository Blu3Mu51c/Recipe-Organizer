const express = require('express');
const router = express.Router();
const dataController = require('./dataController');
const viewController = require('./viewController');

// Home
router.get('/', viewController.home);
// Index
router.get('/recipes', viewController.index);
// New form
router.get('/recipes/new', viewController.new);
// Create recipe
router.post('/recipes', dataController.createRecipe, viewController.redirectToShow);
// Show recipe
router.get('/recipes/:id', viewController.show);
// Edit form
router.get('/recipes/:id/edit', viewController.edit);
// Update recipe
router.put('/recipes/:id', dataController.updateRecipe, viewController.redirectToEdit);
// Add ingredient
router.post('/recipes/:id/ingredients', dataController.addIngredient, viewController.redirectToEdit);
// Delete ingredient
router.delete('/recipes/:id/ingredients/:ingId', dataController.deleteIngredient, viewController.redirectToEdit);
// Delete recipe
router.delete('/recipes/:id', dataController.deleteRecipe, viewController.redirectToIndex);

module.exports = router;
