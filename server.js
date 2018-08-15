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

    con.query("INSERT INTO user SET name = ?, email = ?, password = ?",[name,email,password],function(err, result){

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
                    res.cookie('idd',results[0].id);
                    res.cookie("emaill",results[0].email);
                    res.cookie("passwordd",results[0].password);
                    res.redirect('/notice');
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

app.get('/notice',function(req,res){

    con.query('SELECT * FROM notice',function(err, result){

        if(err)
            throw err;
        else {

            res.render('pages/notice', {items: result });
            //console.log(result);
            //console.log("ID: "+req.cookies.idd);
        }
    });

});



app.get('/notice/add_notice',function(req,res){

    res.render('pages/add_notice');
    //console.log(req.cookies.idd);
});

app.post('/notice/add_notice', function(req, res){

    var title = req.body.title;
    var description = req.body.description;

    con.query("INSERT INTO notice SET title = ?, description = ?",[title,description],function(err, result){

        if(err)
            throw err;
        else{
            res.redirect('/notice');
        }
    });

});

app.get('/notice/:id/edit',function(req,res){

    con.query('SELECT * FROM notice WHERE id=?',[req.params.id],function(err, result){

        if(err)
            throw err;
        else
            res.render('pages/edit',{items: result});
    });


});


app.post('/notice/:id/edit',function(req,res){

   var title = req.body.title;
   var description = req.body.description;

   con.query("UPDATE notice SET title = ?, description = ? WHERE id = ?",[title, description, req.params.id],function(err, result){

       if(err)
           throw err;
       else{

           res.redirect('/notice');
           console.log(req.params);
       }
   });
});

app.get('/notice/:id/delete',function(req,res){

    con.query('DELETE FROM notice WHERE id=?',[req.params.id],function(err, result){

        if(err)
            throw err;
        else{

            if(result.affectedRows){
                res.redirect('/notice');
            }
        }
    });

});


var server = app.listen(3000, function(){

    console.log("Listening on port 3000");
});