const mongoose = require('mongoose')

// Sub-schema for individual ingredients inside a recipe
const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },       // Ingredient name (required)
  quantity: { type: String, required: false },  // Quantity (optional, e.g., '2')
  unit: { type: String, required: false },      // Unit of measurement (optional, e.g., 'cups')
  additional: { type: String, required: false } // Extra info (optional, e.g., 'chopped finely')
})

// Main recipe schema
const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },       // Recipe title (required)
  description: { type: String, required: true }, // Short description (required)
  instructions: { type: String, required: true },// Cooking instructions (required)
  ingredients: [ingredientSchema],                // Array of ingredient sub-documents

  // Category of the dish with predefined options, defaults to 'Main Course'
  category: {
    type: String,
    enum: ['Appetizer', 'Main Course', 'Dessert', 'Snack', 'Drink'],
    default: 'Main Course',
  },

  // Suitable meal time with predefined options, defaults to 'Anytime'
  mealTime: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Supper', 'Anytime'],
    default: 'Anytime',
  },
})

module.exports = mongoose.model('Recipe', recipeSchema)
