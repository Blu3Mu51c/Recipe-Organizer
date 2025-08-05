const express = require('express')
const router = express.Router()
const dataController = require('./dataController')
const viewController = require('./viewController')
const recipesViewController = require('../recipes/viewController')

router.post('/', dataController.createUser, viewController.redirectToLogin) 
router.get('/', viewController.signUp) 
router.post('/login', dataController.loginUser, recipesViewController.redirectHome)
router.get('/login', viewController.signIn) 
router.put('/:id', dataController.updateUser)
router.delete('/:id', dataController.auth, dataController.deleteUser)

module.exports = router
