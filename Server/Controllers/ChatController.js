import ChatModel from "../Models/chatModel.js";

export const createChat = async (req, res) => {
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  const rid=req.body.senderId
  const finda = await ChatModel.findOne({
    members: { $in: [rid] },
    
  });
  console.log(finda)
  try {
    
      const result = await newChat.save();
      res.status(200).json(result);
    
    
    
  } catch (error) {
    res.status(500).json(error);
   
  }
};

export const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
};