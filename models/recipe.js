const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {type:String, required:true},
  quantity: {type:String, required: false} ,
  unit: {type:String, required: false},
  additional: {type:String, required:false},
});

const recipeSchema = new mongoose.Schema({
  title: {type:String, required:true},
  description: {type:String, required:true},
  instructions: {type:String, required:true},
  ingredients: [ingredientSchema],
  category: {
    type: String,
    enum: ['Appetizer', 'Main Course', 'Dessert', 'Snack', 'Drink'],
    default: 'Main Course',
  },
  mealTime: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Anytime'],
    default: 'Anytime',
  },
  
});


module.exports = mongoose.model('Recipe', recipeSchema);
