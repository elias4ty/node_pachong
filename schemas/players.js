const mongoose = require('mongoose'),
      cheerio = require('cheerio'),
      https = require('https');

let playerSchema = new mongoose.Schema({});

exports.module = playSchema;

playerSchema.statics = {
  findPlayers : function* (teamUrl){
      for(let t in teamUrl){

      }
  },
  getPlayer : function(u){
      var html = '';

      https.get(u,(req,res) => {

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
                          name : String,
                          num :　Number,
                          position: String,
                          height: String,
                          weight: String,
                          born: String,
                          payment: String
                      };



              }

          })
      })
  }
}
