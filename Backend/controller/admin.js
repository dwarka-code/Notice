
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
            let age020 = 0
            let age2040 = 0
            let age4060 =0
            let agebigger60=0
            let x = "admin@admin.com"
            let y = req.cookies.user_email
            let cursor = db.collection('user').find()
            cursor.forEach(function(doc, err){


                if(doc.age > 0 && doc.age<=20)
                    age020++
                if(doc.age> 18 && doc.age<=40)
                    age2040++
                if(doc.age> 40 && doc.age<=60)
                    age4060++
                 if(doc.age> 60)
                    agebigger60++

                resultArray.push(doc)
            }, function(){

                if(x === y){
                    db.collection('user').findOne({_id: ObjectID(req.cookies.user_idd)})
                    .then((val)=>{
              
                        if(val){
                          res.json({
                              data: resultArray,
                              age020: age020,
                              age2040: age2040,
                              age4060: age4060,
                              agebigger60: agebigger60,
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

    
    db.collection('user').updateOne({_id: ObjectID(req.params.id)}, { $set: {email: req.body.email, name: req.body.name} }, function(err, rez){

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