import mongoose from "mongoose";

async function connects(url){
   return mongoose.connect(url);
}

export default connects