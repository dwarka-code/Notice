var MongoClient = require('mongodb').MongoClient


var url = 'mongodb://lrs:cs23lrs@ds111063.mlab.com:11063/mydb'

MongoClient.connect(url,{ useNewUrlParser: true }, function(err, database){
         
    if(err){
     console.log(err)
    }
     else{
 
         db = database.db('mydb')
     }
               
 })

function registerUser(req, res){

    var item = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        age: req.body.age
    }
    
    db.collection('user').findOne({email: item.email})
    .then(user =>{
        if(!user){
            db.collection('user').insertOne(item, function(err, result){

                if(err)
                    console.log(err)
                else{                          
                    res.json({
                        status: 'User log in!',
                    })
                }
            })
        }
        else{

            res.json({
                status: 'User already exists!',
                email: ''
            })
        }
    })
    .catch(err => res.send(err))

}



function getLogin(req, res){


    let email = req.body.email
    let password = req.body.password


    db.collection('user').findOne({email: email, password: password})
    .then((user)=>{

        if(user){

            res.cookie('user_idd',user._id)
            res.cookie("user_email",user.email)
            res.cookie('user_name',user.name)

            return res.json({
                status: 'Users Log in',
                email: email,
                password: password
            })
        }
        else{
                return res.json({
                status: 'Email or password is wrong',
                email: '',
                password: ''
            })
        }
    })

}
module.exports = {

    registerUser,
    getLogin,
}