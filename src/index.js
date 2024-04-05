import dotenv from "dotenv";

import connectdb from "./db/index.js";

dotenv.config({
    path:"./env"
})


connectdb()







/*
{async()=>{
    try{
       await mongoose.connect(`${process.env.mongo_url}/${DB_NAME}`)

    }
    catch(error){
        console.log("error",error)
    }
}}
*/
