const jwt=require('jsonwebtoken');


const authenticationMiddleware=async(req, res, next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).send(`No token provided`)
    }

    // split it on a space and we are looking for the second value
    const token=authHeader.split(' ')[1];

    try {
        const decoded=jwt.verify(token, process.env.JWT_SECRET)
        const {id, username}=decoded;
        req.user={id, username};
        next();
    }catch(error){
        res.status(401).send('Not authorized to access this route')
    }

}

module.exports=authenticationMiddleware