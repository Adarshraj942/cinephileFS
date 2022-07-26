import RoomModel from "../Models/roomModel.js"

export const createRoom=async (req,res)=>{
    const newRoom = new RoomModel({
        name:req.body.name,
        Admin:req.body.userId,
        members: [req.body.userId],
      });

      try {
        const result = await newRoom.save();
        res.status(200).json(result);
      } catch (error) {
         console.log(error);
         res.status(500).json(error)
      }
}

export const getRooms=async(req,res)=>{
    try {
        const rooms=await RoomModel.find()
        res.status(200).json(rooms)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const joinRoom=async(req,res)=>{
    const roomId=req.params.id
    const userId=req.body.userId
    console.log(roomId,"  ",userId);
    try {
        const result=await RoomModel.findByIdAndUpdate({_id:roomId},{
            $push:{members:req.body.userId}
        })
        console.log(result);
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const leaveRoom=async(req,res)=>{
    const roomId=req.params.id
    const userId=req.body.userId
    console.log(roomId,"  ",userId);
    try {
        const result=await RoomModel.findByIdAndUpdate({_id:roomId},{
            $pull:{members:req.body.userId}
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getUserRoom=async(req,res)=>{
    try {
        const room = await RoomModel.find({
          members: { $in: [req.params.id] },
        });
        res.status(200).json(room);
      } catch (error) {
        res.status(500).json(error);
      }
}

export const deleteRooms =async(req,res)=>{
    const roomId=req.params.id;
    console.log(roomId);
    try {
        const room=await RoomModel.findById(roomId)
         if(room){
            await room.deleteOne()
            res.status(200).json("Room deleted successfully ")
         }else{
            res.status(401).json("Cannot find room")
         }
           
        
    } catch (error) {
       res.status(500).json(error) 
    }
}