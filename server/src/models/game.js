const mongoose = require('mongoose')

const Schema = mongoose.Schema

const gameSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  players: {
    type: Array,
    required: false
  },
  size: {
    type: Number,
    required: true
  },
  money: {
    type: Number,
    required: true
  },
  bank: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const game = mongoose.model('games', gameSchema)

module.exports = game
