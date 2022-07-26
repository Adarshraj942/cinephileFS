import mongoose from "mongoose";

const MovieSchema=new mongoose.Schema({
    moviename:{
        type:String
    },
    theaterId:{
        type:String
    },
    showtimes:{
        type:Array
    },
    desc:{
        type:String
    },
    ticketcharge:{
        type:String
    },
    releasedate:{
        type:Date
    },
    outdate:{
        type:Date
    },
    image:String
},{
    timestamps:true
})

const MovieModel=mongoose.model("Movies",MovieSchema)
export default MovieModel;