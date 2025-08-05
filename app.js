const express = require('express')
const morgan = require('morgan')
const jsxEngine = require('jsx-view-engine')
const methodOverride = require('method-override');
const homeRoutes = require('./controllers/home/routeController');
const userRoutes = require('./controllers/authentication/routeController')
const recipesRouter = require('./controllers/recipes/routeController')
//const apiRoutes = require('./routes/apiRoutes')
const app = express()

app.set('view engine', 'jsx')
app.engine('jsx', jsxEngine())

app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 
app.use(methodOverride('_method'));

app.use((req, res, next) => {
    res.locals.data = {}
    next()
})
app.use(express.static('public'))
app.use(morgan('dev'))

// Web routes (for views)

app.use('/', homeRoutes);

app.use('/users', userRoutes)
app.use('/recipes', recipesRouter)



// API routes (for JSON responses)
//app.use('/api', apiRoutes)

module.exports = app