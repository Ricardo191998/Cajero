const pool = require("../database");
const user = {};

user.isLoggedIn = (req, res, next) => {
        if (req.isAuthenticated()){
            return next();
        }     
        else{
            res.redirect('/signin');
        }
        
    }


user.getProfile = async (req, res, next) => {
    const historic = await pool.query("SELECT id_count, mount , other_count, day FROM deposit INNER JOIN historic ON deposit.id_deposit = historic.id_deposit WHERE deposit.id_count = ?", [req.user.no_count])
    res.render('profile', {
        historic: historic
    });
}

user.transaction = async (req, res, next)=>{
    const {no_count, debt_collector, mount } = req.body;

    let deposit = {
        id_count: no_count,
        mount: mount ,
        other_count: debt_collector
    }
    
    const user_debt = await pool.query("SELECT * FROM ccount WHERE  no_count = ?", [debt_collector]);
    const my = await pool.query("SELECT * FROM ccount WHERE  no_count = ?", [no_count]);
    if(!user_debt){
       return res.send("Transaccion fallida"); 
    }

    await pool.query("UPDATE ccount SET salary = ? WHERE no_count = ?", [user_debt[0].salary+parseInt(mount),debt_collector]);
    await pool.query("UPDATE ccount SET salary = ? WHERE no_count = ?", [my[0].salary-parseInt(mount),no_count]);
    const dept = await pool.query("INSERT INTO deposit SET ? ", [deposit]);
    await pool.query("INSERT INTO historic SET ? ", [{id_deposit: dept.insertId}]);
    
    res.status(200).redirect("/profile");
}

user.draw_on= async(req, res, next)=>{
    const {no_count, mount } = req.body;

    let deposit = {
        id_count: no_count,
        mount: mount ,
        other_count: "RETIRO"
    }
    
    const my = await pool.query("SELECT * FROM ccount WHERE  no_count = ?", [no_count]);
    if(!my){
       return res.send("Transaccion fallida"); 
    }

    await pool.query("UPDATE ccount SET salary = ? WHERE no_count = ?", [my[0].salary-parseInt(mount),no_count]);
    const dept = await pool.query("INSERT INTO deposit SET ? ", [deposit]);
    await pool.query("INSERT INTO historic SET ? ", [{id_deposit: dept.insertId}]);
    
    res.status(200).redirect("/profile");
}

user.insert_money = async(req, res, next)=>{
    const {no_count,  mount } = req.body;

    let deposit = {
        id_count: no_count,
        mount: mount ,
        other_count: "INGRESO"
    }
    
    const my = await pool.query("SELECT * FROM ccount WHERE  no_count = ?", [no_count]);
    if(!my){
       return res.send("Transaccion fallida"); 
    }

    await pool.query("UPDATE ccount SET salary = ? WHERE no_count = ?", [my[0].salary+parseInt(mount),no_count]); 
    const dept = await pool.query("INSERT INTO deposit SET ? ", [deposit]);
    await pool.query("INSERT INTO historic SET ? ", [{id_deposit: dept.insertId}]);
    
    res.status(200).redirect("/profile");
}

module.exports = user;