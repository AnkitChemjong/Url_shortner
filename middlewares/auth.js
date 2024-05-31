import { getUser } from '../services/auth.js';

//Authentication
function checkForAuthentication(req,res,next){
    //using response instead of cookie by header token
   /** const authorizationHeaderValue=req.headers['authorization'];
    req.user=null;
    if(!authorizationHeaderValue||!authorizationHeaderValue.startsWith("Bearer"))
        return next();
    
    const token=authorizationHeaderValue.split('Bearer ')[1]//"Bearer 232323232323"
    const user=getUser(token);
    req.user=user;
    return next();*/
    const userId=req.cookies?.token;
    req.user=null;
    if(!userId) return next();
    const token=userId;
    const user=getUser(token);
    
    req.user=user;
    next();
}

//Authoraization
//Admin or normal
function restrictTo(roles=[]){
 return function(req,res,next){
    if(!req.user) return res.redirect("/login");
    if (!roles.includes(req.user.role)) return res.end("UnAuthorized");
    return next();
 }
}
export {checkForAuthentication,restrictTo};