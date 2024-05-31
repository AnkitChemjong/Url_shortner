import mongoose from 'mongoose';

const urlSchema=new mongoose.Schema({
    shortID:{
        type:String,
        required:true,
        unique:true,
    },
    redirectURL:{
        type:String,
        required:true,
    },
    visitHistory:[{timestamp:{type:Number}

    }],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
    },

},{timestamps:true});

const URL=mongoose.model('url',urlSchema)
export default URL