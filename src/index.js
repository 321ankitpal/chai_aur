import dotenv from "dotenv";
import {app}  from "./app.js"

import connectdb from "./db/index.js";

dotenv.config({
    path:"./env"
})


connectdb().then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log("listening on port " + process.env.PORT)
    })

}).catch((error)=>{
    console.log("error",error)

}
)







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
