import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectdb =async()=>{
    try{
        const connectionInstance =await mongoose.connect(`${process.env.mongo_url}/${DB_NAME}`)
        console.log(`\n mongodb coonnected to db host :${connectionInstance.connection.host}`);
           
   
       
    }catch(err){
        console.log("mongo connection error",err);
        process.exit(1);
    }
}

export default connectdb;