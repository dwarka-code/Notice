var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID

var url = 'mongodb://lrs:cs23lrs@ds111063.mlab.com:11063/mydb'


function renderAdmin(req, res){

    var resultArray= []

    
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, database){
         
            var db = database.db('mydb')
            var cursor = db.collection('user').find()
            cursor.forEach(function(doc, err){

                resultArray.push(doc)
            }, function(){

                return res.json({

                    data: resultArray
                })
                database.close()
             
            })    
                      
    })
}

function deleteUser(req, res){

    var resultArray= []
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, database){

        if(err)
            console.log(err);
       else{
            var db = database.db('mydb')
            db.collection('user').deleteOne({_id: ObjectID(req.params.id)}, function(err,rez){

                if(err)
                    console.log(err)
                else{
                    //resultArray.push(rez)
                    //console.log(resultArray)
                    return res.json({

                        data: rez
                    })
                    database.close()
                }
            })
       }
    })
}

function editUser(req, res){

    
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, database){

        if(err)
            console.log(err);
       else{

        console.log("EMAIL",req.body.email);
        console.log("NAME",req.body.name)
        var db = database.db('mydb')
        db.collection('user').updateOne({_id: ObjectID(req.params.id)}, {$set:{email: req.body.email}}, function(err, rez){

            if(err)
                console.log(err)
            else{

                return res.json({

                    data: rez
                })
                database.close()
            }
        })
        

       }
    })
}


module.exports = {

    renderAdmin,
    deleteUser,
    editUser
    
}