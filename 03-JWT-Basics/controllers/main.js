// check for username and password in post(login) request
// if exist create new JWT
// send back to front-end

// setup authentication so only the request with JWT can access the dashboard

require('dotenv').config();
const jwt=require('jsonwebtoken');

const login=(req, res)=>{
    try {
        const {username, password}=req.body;
        if(!username || !password){
            return res.status(400).send(`Please provide email and password`)
        }

        // just for demo, normally provided by DB
        const id=new Date().getDate();

        // try to keep payload small, better exp for user
        const token=jwt.sign({id, username},process.env.JWT_SECRET, {expiresIn:'30d'})

        res.status(200).json({msg:`user created`, token})

    } catch (error) {
        res.json(error)
    }
}

const dashboard=(req, res)=>{
    try {
        const {username, id}=req.user;
        const luckyNumber=Math.floor(Math.random()*100);
        res.status(200).json({msg:`Hello ${username}`, secret:`Your secret number is ${luckyNumber}`})
    } 
    catch (error) {
        res.json(error)
    }
}

module.exports={login, dashboard}