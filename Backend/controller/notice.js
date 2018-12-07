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

function renderNotice(req, res, next){

            let resultArray= []
            let x = req.cookies.user_name
            let y = req.cookies.user_idd

            var cursor = db.collection('notice').find({userid: y})
            cursor.forEach(function(doc, err){
    
                resultArray.push(doc)
            }, function(){

                let cursor2 = []
                for(let i=0;i<resultArray.length;i++){

                    cursor2.push(resultArray[i].date)
                }
                console.log("CURSOR2",cursor2)
                if(req.cookies.user_idd){
  
                    db.collection('user').findOne({_id: ObjectID(req.cookies.user_idd)})
                    .then((val)=>{
              
                        if(val){

                          res.json({
                              data: resultArray,
                              name: x,
                              logIn:'User is Log in',
                              date: cursor2
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
        description: req.body.description,
        userid: req.cookies.user_idd,
        date: req.body.date
    }

    console.log("ADD_NOTICE",item)

    db.collection('notice').insertOne(item, function(err, result){

        if(err)
            console.log(err)
        else{
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

function logOut(req, res){

    res.clearCookie('user_idd');
    res.clearCookie('user_email');

    res.json({status: 'Log out'})
}

module.exports = {

    renderNotice,
    renderNoticeDetails,
    addNotice,
    deleteNotice,
    editNotice,
    logOut
}
