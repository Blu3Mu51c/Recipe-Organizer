require('dotenv').config()
const app = require('./app.js')
const database = require('./models/database')
const PORT = process.env.PORT || 3000

database.once('open', () => {
    console.log('connected to mongo')
})

database.on('error', (error) => {
  console.error(error.message)
})

app.listen(PORT, () => {
    console.log(`We in the building ${PORT}`)
})




//const Recipe = require('./models/recipe.js')
/*
//Old Routes

//Homepage that redirects to recipes index
app.get('/', (req, res) => {
  res.redirect('/recipes')
})

// Index to list all available recipes
app.get('/recipes', async (req, res) => {
  const recipes = await Recipe.find({})
  res.render('recipes/Index', {recipes})
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
  res.render('recipes/Show', {recipe})
})

// Edit recipe and ingredients
app.get('/recipes/:id/edit', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)
  res.render('recipes/Edit', {recipe})
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

function capitalizeWords(str) {
  return str
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

// Post/Add ingredient
app.post('/recipes/:id/ingredients', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    recipe.ingredients.push({
      name: capitalizeWords(req.body.name),
      quantity: req.body.quantity,
      unit: req.body.unit.toLowerCase(),
      additional: capitalizeWords(req.body.additional) || ''
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
*/


/*
Accounting for the category and mealtime changes
//My Routes

//Homepage that redirects to recipes index
app.get('/', (req, res) => {
  res.redirect('/recipes')
})

// Index to list all available recipes
app.get('/recipes', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.mealTime) filter.mealTime = req.query.mealTime;

    const recipes = await Recipe.find(filter);
    res.render('recipes/Index', { recipes, filter: req.query });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// New recipe form
app.get('/recipes/new', (req, res) => {
  res.render('recipes/New', { recipe: {} });
});

// Create a recipe with no ingredients
app.post('/recipes', async (req, res) => {
  try {
    const { title, description, instructions, category, mealTime } = req.body;
    const newRecipe = await Recipe.create({
      title,
      description,
      instructions,
      category,
      mealTime,
      ingredients: []
    });
    res.redirect(`/recipes/${newRecipe._id}/edit`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Show selected recipe details
app.get('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send('Recipe not found');
    res.render('recipes/Show', { recipe });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Edit recipe and ingredients
app.get('/recipes/:id/edit', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send('Recipe not found');
    res.render('recipes/Edit', { recipe });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update recipe details
app.put('/recipes/:id', async (req, res) => {
  try {
    const { title, description, instructions, category, mealTime } = req.body;
    await Recipe.findByIdAndUpdate(req.params.id, {
      title,
      description,
      instructions,
      category,
      mealTime
    });
    res.redirect(`/recipes/${req.params.id}/edit`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

function capitalizeWords(str) {
  return str
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

// Post/Add ingredient
app.post('/recipes/:id/ingredients', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    recipe.ingredients.push({
      name: capitalizeWords(req.body.name),
      quantity: req.body.quantity,
      unit: (req.body.unit || '').toLowerCase(),
      additional: capitalizeWords(req.body.additional || '')
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
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.redirect('/recipes');
  } catch (error) {
    res.status(400).send(error.message);
  }
});
*/

