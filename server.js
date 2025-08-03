require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const jsxEngine = require('jsx-view-engine')
const methodOverride = require('method-override')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.set('view engine', 'jsx')
app.engine('jsx', jsxEngine())

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => {
  console.log('We have contact')
})

const Recipe = require('./models/recipe')



//My Routes

//Homepage that redirects to recipes index
app.get('/', (req, res) => {
  res.redirect('/recipes')
})

// Index to list all available recipes
app.get('/recipes', async (req, res) => {
  const recipes = await Recipe.find({})
  res.render('recipes/Index', { recipes })
})

// New recipe form
app.get('/recipes/new', (req, res) => {
  res.render('recipes/New')
})

// Create a recipe with no ingredients
app.post('/recipes', async (req, res) => {
  try {
    const { title, description, instructions } = req.body
    const newRecipe = await Recipe.create({ title, description, instructions, ingredients: [] })
    res.redirect(`/recipes/${newRecipe._id}/edit`)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

// Show selected recipe details
app.get('/recipes/:id', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)
  res.render('recipes/Show', { recipe })
})

// Edit recipe and ingredients
app.get('/recipes/:id/edit', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)
  res.render('recipes/Edit', { recipe })
})

// Update recipe details
app.put('/recipes/:id', async (req, res) => {
  try {
    const { title, description, instructions } = req.body
    await Recipe.findByIdAndUpdate(req.params.id, { title, description, instructions })
    res.redirect(`/recipes/${req.params.id}/edit`)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

// Post/Add ingredient
app.post('/recipes/:id/ingredients', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    recipe.ingredients.push({
      name: req.body.name,
      quantity: req.body.quantity,
      unit: req.body.unit,
      additional: req.body.additional || ''
    });
    await recipe.save();
    res.redirect(`/recipes/${req.params.id}/edit`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


// Delete ingredient
app.delete('/recipes/:id/ingredients/:ingId', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send('Recipe not found');

    recipe.ingredients = recipe.ingredients.filter(
      ing => ing._id.toString() !== req.params.ingId
    );

    await recipe.save();
    res.redirect(`/recipes/${req.params.id}/edit`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete recipe
app.delete('/recipes/:id', async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id)
  res.redirect('/recipes')
})

// Listen request
app.listen(PORT, () => {
  console.log(`Port ${PORT} is now listening`)
})
