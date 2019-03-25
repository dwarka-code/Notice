var MongoClient = require('mongodb').MongoClient

var bcrypt = require('bcrypt')


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

   let email = req.body.email
   let password = req.body.password
   let name = req.body.name
   let age = req.body.age
   let status_user = false //false- not added, true-added

    db.collection('user').findOne({email: email})
    .then(user =>{
        if(!user){

            bcrypt.hash(password, 10, (err, hash)=>{

                if(err)
                    throw err
                db.collection('user').insertOne({email:email, password: hash, name: name, age: age} , (err)=>{
                    
                    if(err)
                        throw err
                    else{
                        status_user = true                         
                        return res.json({
                            status: 'User added!',
                            status_user: status_user
                        })
                    }
                })
            });
        }
        else{
            status_user = false
            return res.json({
                status: 'User already exists!',
                status_user: status_user,
            })
        }
    })
    .catch(err => res.send(err))

}



function getLogin(req, res){


    let email = req.body.email
    let password = req.body.password
   
    // daca aici e endpoint pt facebook
    // se iau date din req , dar primite de la facebook: email, uid, age

    // la db collection caut doar dupa email.
    /*
            db.collection('user').findOne({email: email})
            
            .then((user)=>{
                console.log("User:",user)
                if(user){

                    bcrypt.compare(password, user.password,(err, result)=>{

                        if(err)
                            throw err
                        if(!result)
                            console.log("Password is wrong")

                            res.cookie('user_idd',user._id)
                            res.cookie("user_email",user.email)
                            res.cookie('user_name',user.name)
                
                            return res.json({
                                status: 'Users Log in',
                                email: email,
                                password: password
                            })
                        
                    })
                }
                else{
                        return res.json({
                        status: 'Email is wrong',
                        email: '',
                        password: ''
                    })
                }
            })
            */
           db.collection('user').findOne({email: email})
           .then(user=>{

            if(!user){

                return res.json({
                    message: "User not found",
                    user_status: false
                })
            }
            bcrypt.compare(password, user.password,(err, result)=>{
    
                if(err)
                    throw err
                if(!result){

                    return res.json({

                        message: "Password is wrong!",
                        user_status: false
                    })
                }
                res.cookie('user_idd',user._id)
                res.cookie("user_email",user.email)
                res.cookie('user_name',user.name)
                res.json({

                    message: "User log in!",
                    user_status: true
                })

            })
           })
            
}
module.exports = {

    registerUser,
    getLogin,
}