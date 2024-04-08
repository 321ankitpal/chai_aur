import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    email:{
       
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        
    },
    fullname:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        index:true,

    },
    avatar:{
        type:String,
        required:true,
      
    },
    coverImage:{
        type:String,
        
    },
    watchHistory:[
        {
        type:Schema.Types.ObjectId,
        ref:'video'
    }
],
      password:{
        type:String,
        required:[true,'password is required'],
    },
    refrenceToken:{

    },
},{timesatmps:true})

userschema.pre('save',async function(next){
        if(!this.isModified("password"))  return next();

        this.password=bcrypt.hash(this.password,10);
        next();
})
userschema.methods.ispasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);

}

userschema.methods.generateAuthToken=async function(){
    const token=jwt.sign({_id:this._id},process.env.access_token_generator,{
        expiresIn:proocess.env.access_token_expiry
    });
   
    return token;
}
userschema.methods.generaterefreshToken=async function(){
    const token=jwt.sign({_id:this._id},process.env.refresh_token_secret,{
        expiresIn:proocess.env.refresh_token_expiry
    });
   
    return token;
}

export const user=mongoose.model('user','userschema');