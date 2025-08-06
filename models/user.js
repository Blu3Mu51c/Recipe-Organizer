const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Define User schema with fields: name, email, password, and referenced recipes
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }] // References to Recipe documents
})

// Customize JSON output to hide password when converting user to JSON
userSchema.methods.toJSON = function() {
  const user = this.toObject()
  delete user.password
  return user
}

// Pre-save middleware to hash password if it has been modified
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8) // Hash with salt rounds = 8
  }
  next()
})

// Method to generate JWT auth token for user (using user ID as payload)
userSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this._id }, 'secret') // Replace 'secret' with env variable in production
  return token
}

// Create User model
const User = mongoose.model('User', userSchema)

module.exports = User
