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

    new Promise((resolve,reject) => {
       teamsModel.find({},(err,data) => {
            if(!data.length){
                reject(url);
            }else{
                resolve(data);
            }
       })
    }).then((data) => {
        console.log('find nbaTeams')
        playersModel.valid(data)
    },(url) => {
        console.log('no nbaTeams')
        teamsModel.findAllteams(url);
    }).then((data) => {
        console.log('second find nbaTeams')
        playersModel.valid(data)
    })
})
