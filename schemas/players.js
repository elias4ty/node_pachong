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
  * findPlayers (ins){
     if(ins<arr.length){
       yield this.getPlayer(arr[ins].detail,ins)
     }
  }
  getPlayer(u,i) {
      var html = '',playersModel = this;
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
              console.log(teamName[teamName.lenth - 1])
              this.findPlayers(++i).next();
              /*var playersEntity = new playersModel({
                  teamName : teamName[teamName.lenth - 1],
                  players : players
              })

              playersEntity.save();*/
          })
      })
  }
}

module.exports = playerSchema;
