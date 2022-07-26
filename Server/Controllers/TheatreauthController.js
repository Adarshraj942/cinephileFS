import TheatreModel from "../Models/TheatreModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerTheatre=async (req,res)=>{
  
    const salt=await bcrypt.genSalt(10)
    const hashedPass= await bcrypt.hash(req.body.password,salt)
    req.body.password=hashedPass
    const newTheatre =TheatreModel(req.body)
    const {theatreAdmin}=req.body
    try {
 
 
     const oldUser=await TheatreModel.findOne({theatreAdmin})
     if(oldUser){
         return res.status(400).json({message:"Admin Name already exist"})
     }
      const theatre= await newTheatre.save();
      const token=jwt.sign({
        theatreAdmin:theatre.theatreAdmin, id:theatre._id
      },process.env.JWT_KEY,{expiresIn:'1h'})
      res.status(200).json({theatre,token});
    } catch (error) {
       res.status(500).json({message:error.message})
    }
 }
 
 //login User
 
 export const loginTheatre= async(req,res)=>{
     const {theatreAdmin,password}=req.body;
     console.log(theatreAdmin,password)
   
     try {
        const theatre=await TheatreModel.findOne({theatreAdmin: theatreAdmin})
        console.log(theatre.password)
        if(theatre){
         const validity=await bcrypt.compare(password, theatre.password)
 
        if(!validity){
           res.status(400).json("Wrong password")
        }else if(theatre.auth===false){
          console.log(theatre.auth)
          res.status(401).json("Action forbidden")
        }
        else{
         const token=jwt.sign({
             theatreAdmin:theatre.theatreAdmin, id:theatre._id
          },process.env.JWT_KEY,{expiresIn:'1h'})
 
          res.status(200).json({theatre,token})
        }
     }
     else{
         res.status(404).json("Theatre does not exist")
     }
     } catch (error) {
         res.status(500).json({message:error.message})
     }
 }

 export const updateTheater=async(req,res)=>{

  const id=req.params.id;
  const {_id,password,...other}=req.body;
  console.log("hello",id, req.body)
 


  if(id===_id ){
      try {

          
         const theatre =await TheatreModel.findByIdAndUpdate(id,other,{new:true})

        const token=jwt.sign({
          theatreAdmin:theatre.theatreAdmin,
          id:theatre._id
        },process.env.JWT_KEY,{expiresIn:"1h"})
         res.status(200).json({theatre,token})
         // console.log(theatre,token)

      } catch (error) {
          res.status(500).json(error) 
      }
  }else{
      res.status(403).json("Access denied ! you can update only ypur own profile")
  }
}

export const getTheatreDetails=async(req,res)=>{
    const theatreId=req.params.id;
    console.log(theatreId);
    try {
      const theatre=await TheatreModel.findById(theatreId)
      console.log(theatre);
      res.status(200).json(theatre)

    } catch (error) {
      res.status(500).json(error)
    }
}
