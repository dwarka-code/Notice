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

module.exports = {

    renderRegister,
    registerUser
}