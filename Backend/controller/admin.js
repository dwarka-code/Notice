
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID

var url = 'mongodb://lrs:cs23lrs@ds111063.mlab.com:11063/mydb'

MongoClient.connect(url,{ useNewUrlParser: true }, function(err, database){
         
   if(err){
    console.log(err)
   }
    else{

        db = database.db('mydb')
    }
              
})


function renderAdmin(req, res, next){

            let resultArray = []
            let age_bigger = 0
            let age_smaller = 0
            let cursor = db.collection('user').find()
            cursor.forEach(function(doc, err){


                if(doc.age > 18)
                    age_bigger++
                if(doc.age< 18)
                    age_smaller++

                resultArray.push(doc)
            }, function(){

                if(req.cookies.user_idd){
  
                    db.collection('user').findOne({_id: ObjectID(req.cookies.user_idd)})
                    .then((val)=>{
              
                        if(val){
                          res.json({
                              data: resultArray,
                              age_bigger: age_bigger,
                              age_smaller: age_smaller,
                              logIn:'User is Log in',
                            })
                          next();
                        }
                        else{
                          res.json({logIn: ''})
                        }
                    });
              
                }
                else{
                    res.json({logIn: ''})
                }
             
            })    

}

function deleteUser(req, res){

    db.collection('user').deleteOne({_id: ObjectID(req.params.id)}, function(err,rez){

        if(err)
            console.log(err)
        else{
            return res.json({

                data: rez
            })
        }
    })
}

function editUser(req, res){

    
    var db = database.db('mydb')
    db.collection('user').updateOne({_id: ObjectID(req.params.id)}, {$set:{email: req.body.email}}, function(err, rez){

        if(err)
            console.log(err)
        else{

            return res.json({

                data: rez
            })
        }
    })
}


module.exports = {

    renderAdmin,
    deleteUser,
    editUser
    
}