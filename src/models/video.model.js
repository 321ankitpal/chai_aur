import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const videoSchema=new mongoose.Schema({

    videoFile:{
        type:String,  /// cludinary url
        required:true,

    },
    thumnail:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    durations:{
        type:Number,   //cloudinary url
        required:true
    },
    view:{
        type:Number,
        default:0,
    },
    isPuublished:{
        type:Boolean,
        default:true,

    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    },

})


videoSchema.plugin(mongooseAggregatePaginate)

export const video=mongoose.model('video', videoSchema)