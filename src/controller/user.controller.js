import {user} from '../models/user.model.js';
import {asyncHandler} from '../utilis/asyncHandler.js';

import {apiError} from '../utilis/apiError.js';
import {uploadOnCloudinary} from '../utilis/cloudinary.js';
import {apiresponse} from '../utilis/apiresponse.js';

const registeruser=asyncHandler(async(req, res)=>{
//    get user detail from frontend
//  validation --noot empty
// check if user exists already -- username aor email check
// check for image ,check for coverpage
// upload to them cloudinary
// create user object--create entry in db
// remove password and refresh token field from response 
// check for user creation
// return res

const {fullname,email,username,password}=req.body


// if(username===""){
//     throw new apiError(400,"fullname is required")
// }
  


if(
    [fullname,email,username,password].some((field)=>
         field?.trim()===""
    )
){
    throw new apiError(400,"all fields are required")
}

const existedUser= await user.findOne({
   $or:[{username},{email}]
})

if (existedUser){
    throw new apiError(409,"user already exists")
}


const avatarLocalpath=req.files?.avatar[0]?.path
let coverImageLocalPath;
if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files.coverImage[0].path
}

if(!avatarLocalpath){
    throw new apiError(400,"avatar is required")
}

const avatar=await uploadOnCloudinary(avatarLocalpath)
const coverImage=await uploadOnCloudinary(coverImageLocalPath)


if(!avatar){
    throw new apiError(400,"avatar upload failed")
}


const users = await user.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email, 
    password,
    username: username.toLowerCase()
})

const createdUser = await user.findById(users._id).select(
    "-password -refreshToken"
)

if (!createdUser) {
    throw new apiError(500, "Something went wrong while registering the user")
}

return res.status(201).json(
    new apiresponse(200, createdUser, "User registered Successfully")
)
 
});



export{registeruser};
