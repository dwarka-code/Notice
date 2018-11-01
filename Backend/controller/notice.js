var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID

var url = 'mongodb://lrs:cs23lrs@ds111063.mlab.com:11063/mydb'

function renderNotice(req, res){

    var resultArray= []
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, database){
         
        var db = database.db('mydb')
        var cursor = db.collection('notice').find()
        cursor.forEach(function(doc, err){

            resultArray.push(doc)
        }, function(){

            console.log("Am primit", req.cookies.emaill)
            console.log("Am primit", req.cookies.passwordd)
            return res.json({

                data: resultArray
            })
            database.close()
         
        })    
                  
    })
}

function renderNoticeDetails(req, res){

    var resultArray= []
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, database){

        if(err)
            console.log(err);
       else{
            var db = database.db('mydb')
            db.collection('notice').findOne({_id: ObjectID(req.params.id)}, function(err,rez){

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

function addNotice(req, res){

    var item = {
        title: req.body.title,
        description: req.body.description
    }
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, database){

    
        if(err)
            console.log(err);
        else{
    
            var db = database.db('mydb')
            db.collection('notice').insertOne(item, function(err, result){

                if(err)
                    console.log(err)
                else{

                    console.log("Item added");
                    res.json({status: 'Notice Saved'})
                    database.close();
                }
            })
        }
    })
}

function deleteNotice(req, res){

    var resultArray= []
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, database){

        if(err)
            console.log(err);
       else{
            var db = database.db('mydb')
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
    })
}

function editNotice(req, res){

    
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, database){

        if(err)
            console.log(err);
       else{

        console.log("TITLE",req.body.title);
        console.log("DESCRIPTION",req.body.description)
        const {title, description} = req.body;
        const newNotice = {title, description}
        var db = database.db('mydb')
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
    })
}

module.exports = {

    renderNotice,
    renderNoticeDetails,
    addNotice,
    deleteNotice,
    editNotice
}
