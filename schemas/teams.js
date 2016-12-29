const mongoose = require('mongoose'),
      cheerio = require('cheerio'),
      https = require('https');

let teamsSchma = new mongoose.Schema({
      name : String,
      detail : String,
      icon : String
},{collection : 'nbaTeams'})

teamsSchma.statics = {
    findAllteams(url) {
        var teamsModel = this;
        var pro = new Promise((resolve,reject) => {
              var a = this;
              https.get(url,(teamsData) => {
                  var html = '';
                  teamsData.on('data',(d) => {
                      html+=d
                  })

                  teamsData.on('end',() => {
                      cao(html);
                  })
              })

              function cao(html){
                  let $ = cheerio.load(html),
                      teamlist = $('.players_list'),
                      teamsArr = [];
                  console.log('正在爬取teams数据,一共',teamlist.length)

                    for(let t=0;t<teamlist.length;t++){
                        var team = $(teamlist[t]).children('li');

                        for(let p=0;p<team.length;p++){
                          let teamDetail = {
                              name : $(team[p]).find('.team_name a').text(),
                              detail :　$(team[p]).find('.team_name a').attr('href'),
                              icon : $(team[p]).find('img').attr('src')
                          }
                          //console.log(teamDetail)
                          let teamEntity = new teamsModel(teamDetail)
                          teamEntity.save();
                          teamsArr.push(teamDetail);
                        }
                    }
                    resolve(teamsArr);
              }
        })
        return pro
     }
}
module.exports = teamsSchma
