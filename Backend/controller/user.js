var MongoClient = require('mongodb').MongoClient
var cookieParser = require('cookie-parser');

var url = 'mongodb://lrs:cs23lrs@ds111063.mlab.com:11063/mydb'

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
            db.collection('user').findOne({email: item.email})
            .then(user =>{
                if(!user){

                    db.collection('user').insertOne(item, function(err, result){

                        if(err)
                            console.log(err)
                        else{

                            console.log("Item added!")
                            res.json({status: 'User received!'})
                            database.close()
                        }
                    })
                }
                else{

                    res.json({error: 'User already exist'})
                }

            })
            .catch(err => res.send(err))
            /*
            db.collection('user').insertOne(item, function(err, result){

                if(err)
                    console.log(err)
                else{

                    console.log("Item added!");
                    res.json({status: 'User received!'})
                    database.close();
                }
            })
            */
            
        }
            
    })

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
                    return res.json({
                        status: 'Email or password is wrong',
                        email: '',
                        password: ''
                    })
                }
                else{
                    console.log("SUCCES!")
                    console.log("LOGIN",results.email)
                    console.log("LOGIN",results.password)
                    res.cookie('emaill',results.email);
                    res.cookie('passwordd',results.password);
                    return res.json({
                        status: 'Users Log in',
                        email: email,
                        password: password
                    })
                }
                   
            })
            
        }
            
    })


}

module.exports = {

    registerUser,
    getLogin
}