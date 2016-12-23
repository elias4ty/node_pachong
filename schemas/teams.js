const mongoose = require('mongoose'),
      cheerio = require('cheerio'),
      https = require('https');

let teamsSchma = new mongoose.Schema({
    type : String,
    teams : [{
      name : String,
      detail : String,
      icon : String
    }]
},{collection : 'nbaTeams'})

teamsSchma.statics = {
    findAllteams(url) {
        var teamsModel = this;

        teamsModel.find({type : 'teams'},(err,data) => {
            console.log('20',data)

            if(!data.length){
                var html = '';
                https.get(url,(teamsData) => {

                    teamsData.on('data',(d) => {
                        html+=d
                    })

                    teamsData.on('end',() => {
                        let $ = cheerio.load(html),
                            teamlist = $('.players_list'),
                            teamsArr = [];
                        console.log(teamlist.length,'29')

                          for(let t=0;t<teamlist.length;t++){
                              var team = $(teamlist[t]).children('li');

                              for(let p=0;p<team.length;p++){
                                let teamDetail = {
                                    name : $(team[p]).find('.team_name a').text(),
                                    detail :　$(team[p]).find('.team_name a').attr('href'),
                                    icon : $(team[p]).find('.on img').attr('src')
                                }
                                teamsArr.push(teamDetail)
                              }

                          }

                        console.log('39',teamsArr.length)
                        var teamEntity = new teamsModel({
                            type : 'teams',
                            teams : teamsArr
                        })

                        teamEntity.save();
                    })
                })
            }
        })
    }
}
module.exports = teamsSchma
