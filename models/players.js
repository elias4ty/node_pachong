const mongoose = require('mongoose'),
      playerSchema = require('../schemas/players'),
      playerModel = mongoose.model('playerModel',playerSchema);

module.exports = playerModel;
