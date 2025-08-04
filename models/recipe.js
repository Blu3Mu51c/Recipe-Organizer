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


/*
category which shows what category the food belongs to appetizer main course dessert snack or a drink
category string .....enum with set amount of values

category type = string
enum [appetizer, maincourse dinner snack, annytime/deafult]
default = default

mealtime which shows when u should have the meal example breakfast dinner lunch supper
mealtime string enum with set amount of time values 

mealtime type=string 
enum [breakfast, dinner, supper, lunch,snack, anytime/default]
set default to defeault
*/




/*


*/