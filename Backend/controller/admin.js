
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


function renderAdmin(req, res){


            console.log(req.cookies.emaill)
            let resultArray = []
            let cursor = db.collection('user').find()
            cursor.forEach(function(doc, err){

                resultArray.push(doc)
            }, function(){

                return res.json({

                    data: resultArray
                })
             
            })    

}

function deleteUser(req, res){

    db.collection('user').deleteOne({_id: ObjectID(req.params.id)}, function(err,rez){

        if(err)
            console.log(err)
        else{
            //resultArray.push(rez)
            //console.log(resultArray)
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