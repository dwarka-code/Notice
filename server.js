var express = require('express');
var http = require('http');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('views'));

app.set('view engine', 'ejs');


const con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "skyx"
});

app.get('/',function(req, res){

    //con.query("SELECT * FROM user");
    res.render('pages/home');

});


app.get('/register', function(req, res){

    res.render('pages/register');
});

app.post('/register',function(req, res){

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var post = {
        name : name,
        email : email,
        password : password
    };


   console.log("DATA: "+post);

   con.query("INSERT INTO user SET ?",post,function(err,result){

       if(err) throw err
       else
           console.log(result);
   });
   res.redirect('/');


});






var server = app.listen(3000, function(){

    console.log("Listening on port 3000");
})