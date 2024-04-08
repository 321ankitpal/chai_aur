import {v2 as cloudinary} from "cloudinary"

import fs from "fs"


          
cloudinary.config({ 
  cloud_name: process.env.cloudinary_cloud_name, 
  api_key:process.env.cloudinary_api_key , 
  api_secret: process.env.cloudinary_secret 
})

const uploadcoludiinary=async (localfilepath)=>{
    try{
         if(!localfilepath) return null;

        const response=await cloudinary.uploader.upload(localfilepath,{resource_type:"auto"})
        console.log("file is uploaded on cloudinary",response.url);
        return response;
    }
    catch(error){
          fs.unlink(localfilepath)//remove the locally saved temporary file as the upload operation got failed
          return null;


    }

}


// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });