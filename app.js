const ex = require('express'),
      app = ex(),
      mongoose = require('mongoose'),
      teamsModel = require('./models/teams');

mongoose.connect('mongodb://localhost:27017/ty');
var db = mongoose.connection,
    url = 'https://nba.hupu.com/players';


app.listen(3000)
console.log('tangyang start');

app.get('/',(req,res) => {
    teamsModel.findAllteams(url);
})
