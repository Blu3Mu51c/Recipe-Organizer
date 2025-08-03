const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  unit: String,
  additional: String,
});

const recipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  instructions: String,
  ingredients: [ingredientSchema],
});

module.exports = mongoose.model('Recipe', recipeSchema);
