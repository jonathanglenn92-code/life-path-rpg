const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  lifePath: {
    type: String,
    enum: ['president', 'good_person', 'criminal'],
    required: true
  },
  stats: {
    strength: {
      type: Number,
      default: 10
    },
    money: {
      type: Number,
      default: 100
    },
    reputation: {
      type: Number,
      default: 0
    },
    health: {
      type: Number,
      default: 100
    }
  },
  relationships: {
    friends: [String],
    enemies: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Player', PlayerSchema);