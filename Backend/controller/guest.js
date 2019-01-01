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

 function renderGuests(req, res, next){

    let resultArray= []
    let x = req.cookies.user_name
    let y = req.cookies.user_idd


    var cursor = db.collection('guests').find({userid: y})
    cursor.forEach(function(doc, err){

        resultArray.push(doc)
    }, function(){

        if(req.cookies.user_idd){

            db.collection('user').findOne({_id: ObjectID(req.cookies.user_idd)})
            .then((val)=>{
      
                if(val){
                    
                  res.json({
                      data: resultArray,
                      name: x,
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

 function addGuest(req, res){

    var item = {
        name: req.body.name,
        age: req.body.age,
        userid: req.cookies.user_idd, 
        status: req.body.status,
    }

    db.collection('guests').insertOne(item, function(err, result){

        if(err)
            console.log(err)
        else{
            res.json({status: 'Guest Saved'})
            
        }
    })
 }

 module.exports = {

    renderGuests,
    addGuest,
}

