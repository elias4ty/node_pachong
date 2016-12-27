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
    //var teams = playersModel.findAllteams();
    //if(!teams)teams = playersModel.findAllteams();

    function* findPlayers(ins){
       if(ins<arr.length){
         yield getPlayer(arr[ins].detail,ins)
       }
    }

    var arr = [{ _id: '5860f33ae0429fbf9846979e',
    name: '印第安纳步行者',
    detail: 'https://nba.hupu.com/players/pacers',
    icon: 'https://gdc.hupucdn.com/gdc/nba/team/logo/IND.png',
    __v: 0 },
    { _id: '5860f33ae0429fbf9846979f',
      name: '芝加哥公牛',
      detail: 'https://nba.hupu.com/players/bulls',
      icon: 'https://gdc.hupucdn.com/gdc/nba/team/logo/CHI.png',
      __v: 0 }];


    function getPlayer(u,i){
        var html = '',playersModel = this;
        console.log(u)
        https.get(u,(pres) => {
            var teamName = u.split('/');
            pres.on('data',(data) =>{
                html+=data
            })
            pres.on('end',() =>{
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
                console.log('71888888888888888888888888')
                findPlayers(++i).next()
                /*var playersEntity = new playersModel({
                    teamName : teamName[teamName.lenth - 1],
                    players : players
                })

                playersEntity.save();*/
            })
        })
    }

    findPlayers(0).next()
})
