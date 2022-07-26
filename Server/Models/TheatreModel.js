import mongoose from "mongoose";
const TheatreSchema=new mongoose.Schema({
    theatreAdmin:{
        type:String
    },
    theatrename:{
        type:String
    },
    city:{
        type:String
    },
    capacity:{
        type:Number
    },
    rows:{
        type:Number
    },
    password:{
        type:String
    },
    auth:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})

const TheatreModel=mongoose.model("Theatre",TheatreSchema)

export default TheatreModel

