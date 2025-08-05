const express = require('express');
const router = express.Router();
const dataController = require('./dataController');
const viewController = require('./viewController');

router.get('/', dataController.index, viewController.index);

module.exports = router;
