const mongoose = require('mongoose')

const drinkSchema = new mongoose.Schema({
  name: String,
  description: String,
  ingredients: [String],
  garnishes: [String],
  recipe: String,
  comments: [String],
  likes: Number,
  tags: [String],
  image: String,
})


const Drinks = mongoose.model('Drinks', drinkSchema)

module.exports = Drinks
