const express = require('express');
const router = express.Router();
const dataController = require('./dataController');
const viewController = require('./viewController');

//routes to the main root page to show us all recipes
router.get('/', dataController.index, viewController.index);

module.exports = router;
