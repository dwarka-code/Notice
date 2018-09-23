var MongoClient = require('mongodb').MongoClient

var url = 'mongodb://lrs:cs23lrs@ds111063.mlab.com:11063/mydb'

function renderNotice(req, res){

    var resultArray= []
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, database){

    
        if(err)
            console.log(err);
        else{
    
            var db = database.db('mydb')
            var cursor = db.collection('notice').find()
            cursor.forEach(function(doc, err){

                resultArray.push(doc)
            }, function(){

                database.close()
                console.log(req.cookies.emaill);
                console.log(req.cookies.passwordd);
                res.render('pages/notice',{items: resultArray})
            })
            
        }
            
    })
}

module.exports = {

    renderNotice
}
