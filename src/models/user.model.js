import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


const userSchema=new Schema({
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
       
      
    },
    coverImage:{
        type:String,
        
    },
//     watchHistory:[
//         {
//         type:Schema.Types.ObjectId,
//         ref:"video"
//         },
// ],
      password:{
        type:String,
        required:[true,'password is required'],
    },
    refrenceToken:{

    },
},{timesatmps:true})

userSchema.pre('save',async function(next){
        if(!this.isModified("password"))  return next();

        this.password=await bcrypt.hash(this.password,10);
        next();
})
userSchema.methods.ispasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);

}

userSchema.methods.generateAuthToken=async function(){
    const token=jwt.sign({_id:this._id},process.env.access_token_generator,{
        expiresIn:process.env.access_token_expiry
    });
   
    return token;
}
userSchema.methods.generaterefreshToken=async function(){
    const token=jwt.sign({_id:this._id},process.env.refresh_token_secret,{
        expiresIn:process.env.refresh_token_expiry
    });
   
    return token;
}

 export const user=mongoose.model('user',userSchema);

 