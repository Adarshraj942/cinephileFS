import mongoose  from "mongoose";

const MessageSchema=new mongoose.Schema({
    chatId:{
        type:String
    },
    senderId:{
        type:String
    },
    text:{
         type:String
    },
    name:{
        type:String
    }
},
{
    timestamps:true
})

const MessageModel=mongoose.model("Message",MessageSchema)

export default MessageModel;