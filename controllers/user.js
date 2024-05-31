import user from '../models/user.js';
import {v4 as uuidv4} from 'uuid';
import {setUser} from '../services/auth.js'

async function handleUserSignup(req,res){
    const {name,email,password}=req.body;
   // const emailPresent=user.findOne({email:email});
   // if(emailPresent) return res.redirect('signup');
     await user.create({
        name,email,password
     });
     return res.redirect("/")
}
async function handleUserLogin(req,res){
    const {email,password}=req.body;
     const users=await user.findOne({ email,password});
     if(!users){
        return res.render('/signup',{error:"No Username or Password"})
     }
    // const sessionId=uuidv4();
     //setUser(sessionId,users);
     const token=setUser(users);
     res.cookie('token',token);
     /**response
     return res.json({token});**/
     return res.redirect("/");
}

export {handleUserSignup,handleUserLogin};