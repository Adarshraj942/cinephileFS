import mongoose from "mongoose";

const RoomSchema=new mongoose.Schema(
    {  name: {
          type:String
        } , 
        Admin:{
          type:String
        },
        members: {
          type: Array,
          
        },
      },
      {
        timestamps: true,
      }
)

const RoomModel=mongoose.model("rooms",RoomSchema)
export default RoomModel;
