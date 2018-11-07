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

function renderNotice(req, res){
   
            let resultArray= []
            var cursor = db.collection('notice').find()
            cursor.forEach(function(doc, err){
    
                resultArray.push(doc)
            }, function(){
    
                return res.json({
    
                    data: resultArray
                })
                //database.close()
             
            })          
}

function renderNoticeDetails(req, res){

    db.collection('notice').findOne({_id: ObjectID(req.params.id)}, function(err,rez){

        if(err)
            console.log(err)
        else{

            return res.json({
                data: rez
            })
        }
    })
}

function addNotice(req, res){

    var item = {
        title: req.body.title,
        description: req.body.description
    }

    db.collection('notice').insertOne(item, function(err, result){

        if(err)
            console.log(err)
        else{

            console.log("Item added");
            res.json({status: 'Notice Saved'})
            
        }
    })
}

function deleteNotice(req, res){

    db.collection('notice').deleteOne({_id: ObjectID(req.params.id)}, function(err,rez){

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

function editNotice(req, res){

    db.collection('notice').updateOne({_id: ObjectID(req.params.id)}, { $set: {title: req.body.title, description: req.body.description} }, function(err, rez){

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

module.exports = {

    renderNotice,
    renderNoticeDetails,
    addNotice,
    deleteNotice,
    editNotice
}
