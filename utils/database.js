import mongoose, { mongo } from "mongoose";

let isConnected=false;

export const connectToDB=async()=>{
    mongoose.set('strictQuery',true)
    console.log("status",isConnected)
    if(isConnected){
        console.log("MongoDb is already connected");
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"share_prompt",
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })

        isConnected=true;
        console.log("mongodb connected")
    }catch(err){
        console.log(err)
    }

}
