require('./models/db');
const path = require('path');
const  express = require('express');
const bodyparser = require('body-parser');
const exhbs = require('express-handlebars');


const amazingController = require('./controller/AmazingController');

var app = express();
//#1
app.use(bodyparser.urlencoded({ // Untuk Mengubah Array Atau Object MenJadi Format JSON
    extended : true
}));
//#2
app.use(bodyparser.json());

app.set('views', path.join(__dirname,'/views/'));
app.engine('hbs', exhbs({extname: 'hbs', defaultLayout: 'mainLayout',
            layoutsDir :__dirname +'/views/layout'}))
app.set('view engine','hbs');



app.listen(3000, function(){   // 3000 Adalah PORT Sedangkan Function Merupakan CallBack Dari PORT
    console.log('Express Sedang Berjalan Pada server : 3000')
})


app.use('/amazing', amazingController);