import express from "express"
import { allmovies, createPost, deleteMovie, getMoviesOfSingleTheatre } from "../Controllers/MovieController.js";
const router=express.Router()

router.post("/",createPost)
router.get("/:id",getMoviesOfSingleTheatre)
router.delete("/:id",deleteMovie)
router.get("/",allmovies)
export default router;