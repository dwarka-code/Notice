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

 function truncate(string){

    if (string.length > 15)
       return string.substring(0,15)+'...';
    else
       return string;
 }

 function renderGuests(req, res, next){

    let arrayGuests= []
    let arrayTable=[]
    let name = req.cookies.user_name
    let userid = req.cookies.user_idd

    db.collection('table').updateOne({_id: ObjectID(req.body.id)}, { $set: {people: req.body.asezati} })
    
    let cursor = db.collection('guests').find({userid: userid})
    let cursor1 = db.collection('table').find({userid: userid})
    cursor1.forEach(function(doc, err){
        if(err)
            console.log(err)   
        arrayTable.push(doc)
        
    })
    cursor.forEach(function(doc, err){
        if(err)
            console.log(err)
        arrayGuests.push(doc)
    }, function(){
        for(let i=0;i<arrayGuests.length;i++){

            arrayGuests[i].name=truncate(arrayGuests[i].name)
        }
        
        if(userid){

            db.collection('user').findOne({_id: ObjectID(userid)})
            .then((val)=>{
      
                if(val){
                  res.json({
                      data: arrayGuests,
                      data1: arrayTable,
                      name: name,
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

 function addTable(req, res){

    var item = {
        number: req.body.number_table,
        number_of_people: req.body.number_people,
        userid: req.cookies.user_idd,
        people: []
    }

    db.collection('table').insertOne(item, function(err, result){

        if(err)
            console.log(err)
        else{
            res.json({status: 'Table Saved'})
            
        }
    })
 }
 module.exports = {

    renderGuests,
    addGuest,
    addTable,
}

