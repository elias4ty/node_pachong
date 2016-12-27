const mongoose = require('mongoose'),
      cheerio = require('cheerio'),
      https = require('https');

let playerSchema = new mongoose.Schema({
    teamName : String,
    players : [{
      name : String,
      num :　Number,
      position: String,
      height: String,
      weight: String,
      born: String,
      payment: String,
      pic: String
    }]
},{collection:'nbaPlayers'});

playerSchema.statics = {
  findPlayers (arr){
     var ins = 0,that = this;
     console.log('22')
     return {
       goNext() {
         if(ins<arr.length){
           console.log('ins=',ins)
           that.getPlayer.call(this,that,arr[ins++].detail)
         }
       }
     }
  },
  getPlayer(p,u) {
      var html = '',playersModel = p,that = this;
      console.log(u)
      https.get(u,(res) => {
          var teamName = u.split('/');
          res.on('data',(data) =>{
              html+=data
          })
          res.on('end',() =>{
              let $ = cheerio.load(html),
                  playerList = $('.players_right tbody tr[class!="title"]'),
                  players = [];

              for(let p=0;p<playerList.length;p++){
                  var player = $(playerList[p]).children('td');
                      playerObj = {
                        name : $(player[1]).find('a').text(),
                        num :　$(player[2]).text(),
                        position: $(player[3]).text(),
                        height: $(player[4]).text(),
                        weight: $(player[5]).text(),
                        born: $(player[6]).text(),
                        payment: $(player[7]).text(),
                        pic: $(player[0]).find('img').attr('src')
                      };
                  players.push(playerObj);
              }
              console.log(teamName[teamName.length - 1])
              that.goNext();
              
              var playersEntity = new playersModel({
                  teamName : teamName[teamName.length - 1],
                  players : players
              })

              playersEntity.save();
          })
      })
  }
}

module.exports = playerSchema;
