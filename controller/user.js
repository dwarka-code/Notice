var mysql = require('mysql');
var bcrypt = require('bcrypt');
const saltRound = 10;

const con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
});


function renderRegister(req, res){

    res.render('pages/register');
}

function registerUser(req, res){

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    bcrypt.hash(password, saltRound, function(err, hash){

        con.query("INSERT INTO user SET name = ?, email = ?, password = ?",[name,email,hash],function(err, result){

            if(err)
                res.send("User already exist");
            else{
                res.redirect('/');
            }
         });
    })
    
}

function renderLogin(req, res){

    res.render('pages/login');
}

function getLogin(req, res){

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
}

module.exports = {
    renderRegister,
    registerUser,
    renderLogin,
    getLogin
}