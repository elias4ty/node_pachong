const ex = require('express'),
      app = ex(),
      mongoose = require('mongoose'),
      hahas = require('./models/hahas');

mongoose.connect('mongodb://localhost:27017/ty');
let db = mongoose.connection;

// app.set('view engine','html')
db.on('error',console.error.bind(console,'connect error'));
db.once('open',()=>console.log('suc'))

app.listen(3000)
console.log('tangyang start');
