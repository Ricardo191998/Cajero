//Data base
const pool = require("../database");
const helpers = require("../lib/helpers");
const adminController = {};

adminController.createUser = async (req , res) =>{
    const {name, email , direction, telephone} = req.body;

    let newUser = {
           name,
           email,
           direction,
           telephone
    } 

    pool.query("INSERT INTO user SET ?", [newUser])
        .then((res)=> {
            console.log(res);
        })
        .catch((error)=>{
            console.log(error);
        });
    
    res.send("User CREATED");
}

adminController.getUser = async (req, res)=>{
    const id_user = req.params.id;
    

    const user = await pool.query("SELECT * FROM user WHERE  id_user = ?", [id_user])
    
    if(!user){
        return res.send({mesage : "user invalid"});
    }

    res.send(user);
}


adminController.getUsers = async (req, res)=>{
    const users = await pool.query("SELECT * FROM user");
    
    if(!users){
        return res.send({mesage : "user invalid"});
    }

    res.send(users);
}

adminController.getCount = async(req, res)=>{
    const no_count = req.params.id;
    

    const count = await pool.query("SELECT * FROM ccount WHERE  no_count = ?", [no_count])
    
    if(!count){
        return res.send({mesage : "user invalid"});
    }

    res.send(count);
}

adminController.getCounts = async(req, res)=>{
  

    const counts = await pool.query("SELECT * FROM ccount;")
    
    if(!counts){
        return res.send({mesage : "No users"});
    }

    res.send(counts);
}

adminController.getDeposits = async(req, res)=>{
    const {no_count} = req.body;

    const deposits = await pool.query("SELECT * FROM deposit WHERE  no_count = ?", [no_count])
    
    if(!deposits){
        return res.send({message: "error"})
    }

    res.send(deposits);
}

adminController.createCount = async (req , res) =>{
    const {no_count,pass, salary, user} = req.body;

    let newCount = {
           no_count,
           pass,
           salary,
           user
    } 

    newCount.pass = await helpers.encryptPassword(pass);
    pool.query("SELECT * FROM ccount WHERE  no_count = ?", [no_count])
        .then((res)=> {
            if(res){
                pool.query("INSERT INTO ccount SET ?", [newCount])
                .then((res)=> {
                    console.log(res);
                })
                .catch((error)=>{
                    console.log(error);
                    return res.status(300).send("ERROR WHILE CREATE A USER")
                });
            }else{
                return res.status(300).send("COUNT ALREDY IN USE")
            }
        })
        .catch((error)=>{
            console.log(error);
     });

   
    
    res.send("COUNT CREATED");
}

adminController.deleteUser = (req , res) =>{
    const user_id = req.params.id;

    //const user = pool.query("DELETE FROM user WHERE user_id = ?)" , [user_id]);
    
    pool.query("DELETE FROM user WHERE id_user = ?", [user_id])
        .then((res)=> {
            console.log(res);
        })
        .catch((error)=>{
            console.log(error);
        });

    res.send("User DELETED");
}

adminController.deleteCount = (req , res) =>{
    const no_count = req.params.id;

    //const user = pool.query("DELETE FROM user WHERE user_id = ?)" , [user_id]);
    
    pool.query("DELETE FROM ccount WHERE no_count = ?", [no_count])
        .then((res)=> {
            console.log(res);
        })
        .catch((error)=>{
            console.log(error);
        });

    res.send("Count DELETED");
}

adminController.updateUser = async (req, res)=>{
    const {user_id, name, email , direction, telephone} = req.body;

    let newUser = {
        user_id,
        name,
        email,
        direction,
        telephone
    } 

    const user = pool.query("SELECT * FROM user WHERE id_user = ?" , [user_id]);


    if(user){
        try{
            await pool.query('UPDATE user set ? WHERE id_user = ?', [newUser, user_id]);
        }catch(error){
            return res.status(400).send("ERROR");
        }
    }else{
        return res.status(400).send("ERROR");
    }

    
    res.send("User UPDATE");
}

adminController.updateCount = async (req, res)=>{
    const {no_count, pass, salary , user} = req.body;

    let newCount = {
        no_count,
        pass,
        salary,
        user
    } 

    const count = pool.query("SELECT * FROM ccount WHERE no_count = ?" , [no_count]);

    newCount.pass = helpers.encryptPassword(pass);

    if(count){
        try{
            await pool.query('UPDATE ccount set ? WHERE no_count = ?', [newCount, no_count]);
        }catch(error){
            return res.status(400).send("ERROR");
        }
    }else{
        return res.status(400).send("ERROR");
    }

    
    res.send("User UPDATE");
}

module.exports = adminController;