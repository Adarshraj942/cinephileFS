import MovieModel from "../Models/MovieModel.js";
import mongoose from "mongoose";
import TheatreModel from "../Models/TheatreModel.js";
export const createPost=async(req,res)=>{
    const newPost=new MovieModel(req.body)
    
    try {
      const data =  await newPost.save()
      console.log(data);
        res.status(200).json(newPost)
    } catch (error) {
        res.status(500).json(error)

    }
}

export const getMoviesOfSingleTheatre=async(req,res)=>{
   const theatreId=req.params.id
   console.log(theatreId);
    try {
        if(theatreId){
            const movies=await MovieModel.find({theaterId:theatreId})
            res.status(200).json(movies.reverse())
            console.log(movies)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteMovie=async(req,res)=>{
    const movieId=req.params.id;
    try {
        const data=await MovieModel.findByIdAndDelete(movieId)
        res.status(200).json("Movie deleted successfully")
    } catch (error) {
       res.status(500).json(error)
    }
}
export const allmovies=async(req,res)=>{
    try {
        console.log("haiiii");
       const movies = await MovieModel.find()

       res.status(200).json(movies)
    } catch (error) {
       res.status(500).json(error) 
    }
}