const express = require('express');
const router = express.Router();
const viewController = require('./viewController.js');
const dataController = require('./dataController.js');
const authDataController = require('../authentication/dataController.js');

// Index add auth to all pages
router.get(
  '/',
  authDataController.auth,
  dataController.index,
  viewController.index
);

// New recipe
router.get('/new', authDataController.auth, viewController.newView);

// Delete entire recipe including all ingredients
router.delete('/:id', authDataController.auth, dataController.destroy, viewController.redirectHome);

// Update recipe details
router.put('/:id', authDataController.auth, dataController.update, viewController.redirectShow);

// Take to edit page for convenience for adding ingredients
router.post('/', authDataController.auth, dataController.create, viewController.redirectEdit);

//Create a new ingredient
router.post(
  '/:id/ingredients',
  authDataController.auth,
  dataController.addIngredient,
  viewController.redirectEdit
);

//Delete an individual ingredient
router.delete(
  '/:recipeId/ingredients/:ingredientId',
  authDataController.auth,
  dataController.deleteIngredient,
  viewController.redirectEdit
);

// Edit recipe
router.get('/:id/edit', authDataController.auth, dataController.show, viewController.edit);

// Show individual recipe
router.get('/:id', authDataController.auth, dataController.show, viewController.show);

module.exports = router;
