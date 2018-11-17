var express = require('express');
var http = require('http');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var MongoClient = require('mongodb').MongoClient
var cors = require('cors')
var app = express();

const user = require('./controller/user.js')
const admin = require('./controller/admin.js')
const notice = require('./controller/notice.js')





//username: lrs
//password: cs23lrs

const url = 'mongodb://lrs:cs23lrs@ds111063.mlab.com:11063/mydb'

const corsOptions={
    credentials: true,
    origin: 'http://localhost:3000'
}
app.use(cors(corsOptions))//asta e pt ca UI-ul e pe alt domeniu fata de backend

app.use(express.static('views'));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'ejs');  


//Register
//app.get('/register',user.renderRegister)
app.post('/register',user.registerUser)

//Login
app.post('/login',cors(corsOptions),user.getLogin)

//Admin
app.get('/admin', admin.renderAdmin)
app.put('/admin/edit/:id',admin.editUser)
app.delete('/admin/delete/:id',admin.deleteUser)


//Notice
app.get('/notice',cors(corsOptions),notice.renderNotice)
app.get('/notice/:id',notice.renderNoticeDetails)
app.put('/notice/edit/:id',notice.editNotice)
app.post('/notice/addnotice',notice.addNotice)
app.delete('/notice/delete/:id', notice.deleteNotice)

   

    


app.listen(4000, function(){

    console.log("Listening to port 4000")
})



