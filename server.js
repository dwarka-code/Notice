var express = require('express');
var http = require('http');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

const user = require('./controller/user.js')
const notice = require('./controller/notice.js')

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('views'));

app.set('view engine', 'ejs');


const con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
});

app.get('/',function(req, res){

    res.render('pages/home');

});
//Register
app.get('/register', user.renderRegister)
app.post('/register', user.registerUser)

//Login
app.get('/login', user.renderLogin)
app.post('/login', user.getLogin)
app.get('/notice', notice.renderNotice)
app.post('/', notice.logOut)

//Add notice
app.get('/notice/add_notice', notice.renderAddNotice)
app.post('/notice/add_notice', notice.addNotice)

//Edit notice
app.get('/notice/:id/edit', notice.renderEditNotice)
app.post('/notice/:id/edit', notice.editNotice) 

//Delete notice
app.get('/notice/:id/delete', notice.deleteNotice)

var server = app.listen(3000, function(){

    console.log("Listening on port 3000");
});