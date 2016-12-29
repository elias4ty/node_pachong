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
        return teamsModel.findAllteams(url)
    }).then((data) => {
        if(typeof data === "object"){
          console.log('收到爬取的teams数据',data.length)
          playersModel.valid(data)
        }else{
            console.log('完')
        }
    })
})
