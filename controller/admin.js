var mysql = require('mysql');

const con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
});


function renderAdmin(req, res){

    con.query('SELECT * FROM user',function(err, result){


        if(err)
            console.log(err);
        else
        res.render('pages/admin',{items: result});
    })
    
}

function deleteUser(req, res){

    con.query('DELETE FROM user WHERE id=?',[req.params.id],function(err, result){

        if(err)
            throw err;
        else{

            if(result.affectedRows){
                res.redirect('/admin');
            }
        }
    });
}

module.exports = {

    renderAdmin,
    deleteUser
}