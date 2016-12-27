const ex = require('express'),
      app = ex(),
      mongoose = require('mongoose'),
      teamsModel = require('./models/teams'),
      playersModel = require('./models/players'),
      https = require('https'),
      cheerio = require('cheerio');

mongoose.connect('mongodb://localhost:27017/ty');
var db = mongoose.connection,
    url = 'https://nba.hupu.com/players';


app.listen(3000)
console.log('tangyang start');

app.get('/',(req,res) => {
    teamsModel.findAllteams(url);
})

app.get('/players',(req,res) => {
    var teams = teamsModel.findAllteams();
    console.log(teams)
    if(!teams){
        teamsModel.find({},(err,data) => {
            console.log('26')
            valid(teams)
        })
    }else {
        valid(teams)
    }

    function valid(ts){
      playersModel.find({},(err,data) => {
          console.log('35',data.length)
          if(!data.length){
            var iterator = playersModel.findPlayers(ts);
            iterator.goNext();
          }
      })
    }
    // var data = [{
    //   	"_id" : "58628b63ba5ece05715ecf85",
    //   	"name" : "纽约尼克斯",
    //   	"detail" : "https://nba.hupu.com/players/knicks",
    //   	"icon" : "https://gdc.hupucdn.com/gdc/nba/team/logo/NYK.png",
    //   	"__v" : 0
    //   },
    //   {
    //   	"_id" : "58628b63ba5ece05715ecf86",
    //   	"name" : "布鲁克林篮网",
    //   	"detail" : "https://nba.hupu.com/players/nets",
    //   	"icon" : "https://gdc.hupucdn.com/gdc/nba/team/logo/BKN.png",
    //   	"__v" : 0
    //   }];
    //
    // var iterator = playersModel.findPlayers(data);
    // iterator.goNext();
})
