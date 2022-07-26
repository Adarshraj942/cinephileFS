import PostModel from "../Models/postModel.js";
import UserModel from "../Models/userModel.js";
import mongoose from "mongoose";

//create new post

export const createPost=async(req,res)=>{
    const newPost=new PostModel(req.body)
    try {
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        res.status(500).json(error)

    }
}

//get posts

export const getPost=async (req,res)=>{
    const id=req.params.id
    try {
        const post= await PostModel.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}

//update a post

export const updatePost=async (req,res)=>{
    const postId=req.params.id
    const{userId}=req.body;
    try {
        const post=await PostModel.findById(postId)
        if(post.userId===userId){
            await PostModel.updateOne({$set:req.body})
            res.status(200).json("Post updated")
        }else{
            res.status(403).json("Action forbidden")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//delete a post

export const deletePost =async (req,res)=>{
    const id=req.params.id;
    console.log(req.body);
    try {
        const post =await PostModel.findById(id)
        if(post)
        {
           await post.deleteOne()
            res.status(200).json("Post deleted successfully")
        }else{
            res.status(404).json("Post not found")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//like and dislike a post

export const likePost=async (req,res)=>{
    const id=req.params.id;
    const {userId}=req.body;
 
    try {
        const post =await PostModel.findById(id)
        if(!post.likes.includes(userId))
        {
            await post.updateOne({$push:{likes:userId}})
            res.status(200).json("POst liked")
           
        }else{
            await post.updateOne({$pull:{likes:userId}})
            res.status(200).json("Post unliked")
           
        }
    } catch (error) {
        res.status(500).json(error)
    }
}
//get all posts
export const allPosts= async (req,res)=>{
    try {
        const data=await PostModel.find()
        res.status(200).json(data.reverse())
    } catch (error) {
       res.status(200).json(error) 
    }
}

//get time line post
export const getTimelinePosts =async (req,res)=>{
      const userId =req.params.id;
      console.log("fetchinggg   1");
      try {
         const currentUserPosts=await PostModel.find({userId:userId})
         const followingPosts=await UserModel.aggregate([
            {
                $match:{
                    _id:new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup:{
                    from:"posts",
                    localField:"following",
                    foreignField:"userId",
                    as:"followingPosts"
                }
            },
            {
                $project:{followingPosts:1,_id:0}
            }
         ])

         
         res.status(200).json(currentUserPosts.concat(...followingPosts[0].followingPosts).sort((a,b)=>{
            return b.createdAt-a.createdAt
         }))
         console.log(followingPosts);
      } catch (error) {
        res.status(500).json(error)
      }
}

export const addComment=async(req,res)=>{
    const postId=req.body.postId
    const userData=await UserModel.findById(req.body.postedBy)
    console.log(userData);
    const comment ={
        postId:postId,
        text:req.body.commentText,
        postedBy:req.body.postedBy,
        commentedUserData:userData
    }
    console.log(comment);
    try {
       const comments= await PostModel.findByIdAndUpdate(postId,{
        $push:{comments:comment}
       })
       console.log(comments);
       const data=comments.comments
       res.status(200).json(data.reverse() )
    } catch (error) {
        res.status(500).json(error)
    }
}
