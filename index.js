import express from 'express';
import connects from './connect.js';
import path from 'path';
import staticRoute from './routes/staticRouter.js';
import router from './routes/url.js';
import userRoute from './routes/user.js';
import cookieParser from 'cookie-parser';
import {checkForAuthentication,restrictTo} from './middlewares/auth.js';
const app=express();
const port=8000;

connects('mongodb://localhost:27017/short-url').then(()=>console.log('Connected to database')).catch((e)=>console.log(e));
app.use(express.json());
app.use(express.urlencoded({ extended:false }));//for form data
app.use(cookieParser());
app.use(checkForAuthentication);

app.set('view engine', 'ejs');
app.set('views',path.resolve("./views"));

app.use('/',staticRoute);
app.use('/url',restrictTo(["NORMAL","Admin"]),router);
app.use('/user',userRoute);


app.listen(port,() =>console.log(`listening on port:`+ port));