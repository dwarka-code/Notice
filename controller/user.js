var MongoClient = require('mongodb').MongoClient

var url = 'mongodb://lrs:cs23lrs@ds111063.mlab.com:11063/mydb'

function renderRegister(req, res){

    res.render('pages/register')
}

function registerUser(req, res){

    var item = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    }
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, database){

    
        if(err)
            console.log(err);
        else{
    
            var db = database.db('mydb')
            db.collection('user').insertOne(item, function(err, result){

                if(err)
                    console.log(err)
                else{

                    console.log("Item added");
                    

                    database.close();
                    res.redirect('/')
                }
            })
            
        }
            
    })

}

function renderLogin(req, res){

    res.render('pages/login')
}

function getLogin(req, res){

    var email = req.body.email
    var password = req.body.password

    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, database){

    
        if(err)
            console.log(err);
        else{
    
            var db = database.db('mydb')
            db.collection('user').findOne({email: email, password: password}, function(err, results){

                if(err){
                    console.log(err);
                }
                if(!results){
                    res.send("Email or password is wrong!")
                }
                else{
                    console.log("SUCCES!")
                    res.cookie("emaill",results.email);
                    res.cookie("passwordd",results.password);
                    res.redirect('/notice')
                }
                   
            })
            
        }
            
    })


}

module.exports = {

    renderRegister,
    registerUser,
    renderLogin,
    getLogin
}