var mysql = require('mysql');

const con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
});

function renderNotice(req, res){

    con.query('SELECT * FROM notice WHERE userID=?',[req.cookies.idd],function(err, result){

        if(err)
            throw err;
        else {
            console.log(result);
            
            res.render('pages/notice', {items: result }); 
            console.log("ID: "+req.cookies.idd);
            console.log("EMAIL: "+req.cookies.emaill);
            console.log("PASSWORD: "+req.cookies.passwordd);
            

        }
    });
}


function renderAddNotice(req, res){

    res.render('pages/add_notice');
    //console.log(req.cookies.idd);
}

function addNotice(req, res){

    var title = req.body.title;
    var description = req.body.description;
    var userID = req.cookies.idd;

    con.query("INSERT INTO notice SET title = ?, description = ?, userID = ?",[title,description,userID],function(err, result){

        if(err)
            throw err;
        else{
            res.redirect('/notice');
            console.log("USERID: ",userID);
        }
    });
}

function renderEditNotice(req, res){

    con.query('SELECT * FROM notice WHERE id=?',[req.params.id],function(err, result){

        if(err)
            throw err;
        else
            res.render('pages/edit',{items: result});
    });
}

function editNotice(req, res){

    var title = req.body.title;
   var description = req.body.description;

   con.query("UPDATE notice SET title = ?, description = ? WHERE id = ?",[title, description, req.params.id],function(err, result){

       if(err)
           throw err;
       else{

           res.redirect('/notice');
           console.log(req.params);
       }
   });
}

function deleteNotice(req, res){

    con.query('DELETE FROM notice WHERE id=?',[req.params.id],function(err, result){

        if(err)
            throw err;
        else{

            if(result.affectedRows){
                res.redirect('/notice');
            }
        }
    });
}


module.exports = {

    renderNotice,
    renderAddNotice,
    addNotice,
    renderEditNotice,
    editNotice,
    deleteNotice
}
