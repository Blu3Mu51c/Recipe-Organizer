const express = require('express')
const morgan = require('morgan')
const jsxEngine = require('jsx-view-engine')
const methodOverride = require('method-override')

// Import route controllers
const homeRoutes = require('./controllers/home/routeController')
const userRoutes = require('./controllers/authentication/routeController')
const recipesRouter = require('./controllers/recipes/routeController')

const app = express()

// Set JSX as the view engine for server-side rendering
app.set('view engine', 'jsx')
app.engine('jsx', jsxEngine())

// Middleware to parse JSON and urlencoded form data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Support HTTP verbs like PUT and DELETE via query param _method
app.use(methodOverride('_method'))

// Initialize res.locals.data for sharing data between middleware and views
app.use((req, res, next) => {
  res.locals.data = {}
  next()
})

// Serve static files from the 'public' directory
app.use(express.static('public'))

// HTTP request logger middleware for development
app.use(morgan('dev'))

// Register routers for different URL paths
app.use('/', homeRoutes)
app.use('/users', userRoutes)
app.use('/recipes', recipesRouter)

module.exports = app
