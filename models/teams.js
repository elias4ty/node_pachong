const mongoose = require('mongoose'),
      teamsSchma = require('../schemas/teams'),
      teamsModel = mongoose.model('teams',teamsSchma);

module.exports = teamsModel;      
