import express from 'express'
import URL from '../models/url.js';
import {restrictTo} from '../middlewares/auth.js'
const router=express.Router();

router.get('/admin/urls',restrictTo(['Admin']),async (req, res) => {
    const allUrl=await URL.find({})
    return res.render('home',{
        urls:allUrl
    });
})
router.get('/',restrictTo(["NORMAL","Admin"]),async (req,res)=>{
    const allUrl=await URL.find({createdBy: req.user._id})
    return res.render('home',{
        urls:allUrl
    });
})

router.get('/signup',(req,res)=>{
    return res.render('signup');
});
router.get('/login',(req,res)=>{
    return res.render('login');
});

export default router