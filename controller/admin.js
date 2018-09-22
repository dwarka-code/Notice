var MongoClient = require('mongodb').MongoClient

var url = 'mongodb://lrs:cs23lrs@ds111063.mlab.com:11063/mydb'

function renderAdmin(req, res){

    var resultArray= []
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, database){

    
        if(err)
            console.log(err);
        else{
    
            var db = database.db('mydb')
            var cursor = db.collection('user').find()
            cursor.forEach(function(doc, err){

                resultArray.push(doc)
            }, function(){

                database.close()
                res.render('pages/admin',{items: resultArray})
            })
            
        }
            
    })
}

module.exports = {

    renderAdmin
    
}