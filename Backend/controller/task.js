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

function renderTasks(req, res, next){

            let resultArray= []
            let x = req.cookies.user_name
            let y = req.cookies.user_idd

            var cursor = db.collection('tasks').find({userid: y})
            cursor.forEach(function(doc, err){
    
                resultArray.push(doc)
            }, function(){

                let cursor2 = []
                for(let i=0;i<resultArray.length;i++){

                    cursor2.push(resultArray[i].date)
                }             

                if(req.cookies.user_idd){
  
                    db.collection('user').findOne({_id: ObjectID(req.cookies.user_idd)})
                    .then((val)=>{
              
                        if(val){
                            
                          res.json({
                              data: resultArray,
                              name: x,
                              lungime: resultArray.length,
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

function renderTaskDetails(req, res){

    db.collection('tasks').findOne({_id: ObjectID(req.params.id)}, function(err,rez){

        if(err)
            console.log(err)
        else{

            return res.json({
                data: rez
            })
        }
    })
}

function addTask(req, res){

    var item = {
        title: req.body.title,
        description: req.body.description,
        userid: req.cookies.user_idd,
        date: req.body.date,
        time: req.body.time
    }
    console.log(item)

    db.collection('tasks').insertOne(item, function(err, result){

        if(err)
            console.log(err)
        else{
            res.json({status: 'Task Saved'})
            
        }
    })
}

function deleteTask(req, res){

    db.collection('tasks').deleteOne({_id: ObjectID(req.params.id)}, function(err,rez){

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

function editTask(req, res){

    db.collection('tasks').updateOne({_id: ObjectID(req.params.id)}, { $set: {title: req.body.title, description: req.body.description, date: req.body.date, time: req.body.time} }, function(err, rez){

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

    renderTasks,
    renderTaskDetails,
    addTask,
    deleteTask,
    editTask,
    logOut
}
