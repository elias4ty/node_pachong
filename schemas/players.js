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
     console.log('没有球员数据，准备爬取...')
     return {
       goNext() {
         if(ins<arr.length){
           console.log('正在爬取第',ins,'只球队的球员数据')
           that.getPlayer.call(this,that,arr[ins++].detail)
         }else{
            console.log('爬取球员数据已完毕,',ins)
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

              var playersEntity = new playersModel({
                  teamName : teamName[teamName.length - 1],
                  players : players
              })

              playersEntity.save();

              that.goNext();
          })
      })
  },
  valid(ts) {
      this.find({},(err,data) => {
          console.log('找到',data.length,'支球队的球员')
          if(!data.length){
            console.log('数据库里已经有teams数据，',ts.length)
            var iterator = this.findPlayers(ts);
            iterator.goNext();
          }else{
             console.log('数据库里已经有球员数据，不需爬取')
          }
      })
  }
}

module.exports = playerSchema;
