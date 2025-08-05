const express = require('express');
const router = express.Router();
const viewController = require('./viewController.js');
const dataController = require('./dataController.js');
const authDataController = require('../authentication/dataController.js');

// Index
router.get(
  '/',
  authDataController.auth,
  dataController.index,
  viewController.index
);

// New
router.get('/new', authDataController.auth, viewController.newView);

// Delete
router.delete('/:id', authDataController.auth, dataController.destroy, viewController.redirectHome);

// Update
router.put('/:id', authDataController.auth, dataController.update, viewController.redirectShow);

// Create
router.post('/', authDataController.auth, dataController.create, viewController.redirectEdit);
//Create
router.post(
  '/:id/ingredients',
  authDataController.auth,
  dataController.addIngredient,
  viewController.redirectEdit
);

//Delete
router.delete(
  '/:recipeId/ingredients/:ingredientId',
  authDataController.auth,
  dataController.deleteIngredient,
  viewController.redirectEdit
);

// Edit
router.get('/:id/edit', authDataController.auth, dataController.show, viewController.edit);

// Show
router.get('/:id', authDataController.auth, dataController.show, viewController.show);

module.exports = router;
