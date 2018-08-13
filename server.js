var express = require('express');
var http = require('http');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');


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

    con.query("INSERT INTO user SET name = ?, email = ?, password = ?",[name,email,password,email],function(err, result){

       if(err)
           res.send("User already exist");
       else{
           res.redirect('/');
       }
    });
});

app.get('/login',function(req, res){

   res.render('pages/login');
});

app.post('/login',function(req,res){

    var email= req.body.email;
    var password = req.body.password;
    con.query('SELECT * FROM user WHERE email = ?',[email], function (error, results, fields) {
        if (error) {
            // console.log("error ocurred",error);
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
        }else{
            // console.log('The solution is: ', results);
            if(results.length >0){
                if(results[0].password == password){
                    res.cookie("emaill",results[0].email);
                    res.cookie("passwordd",results[0].password);
                    res.send({
                        "code":200,
                        "success":"login sucessfull"
                    });
                }
                else{
                    res.send({
                        "code":204,
                        "success":"Email or password is wrong!"
                    });
                }
            }
            else{
                res.send({
                    "code":204,
                    "success":"Email does not exits"
                });
            }
        }
    });
});






var server = app.listen(3000, function(){

    console.log("Listening on port 3000");
})