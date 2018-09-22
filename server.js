var express = require('express');
var http = require('http');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var MongoClient = require('mongodb').MongoClient
var app = express();

const user = require('./controller/user.js')
const admin = require('./controller/admin.js')



//username: lrs
//password: cs23lrs

var url = 'mongodb://lrs:cs23lrs@ds111063.mlab.com:11063/mydb'


app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('views'));

app.set('view engine', 'ejs');


app.get('/',function(req, res){

    res.render('pages/home')
})

//Register
app.get('/register',user.renderRegister)
app.post('/register',user.registerUser)

//Admin
app.get('/admin', admin.renderAdmin)

    
        


app.listen(3000, function(){

    console.log("Listening to port 3000")
})


