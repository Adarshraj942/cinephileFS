import express from "express"
import { getTheatreDetails, loginTheatre, registerTheatre, updateTheater } from "../Controllers/TheatreauthController.js";
const router=express.Router()
router.post("/register",registerTheatre)
router.post("/login",loginTheatre)
router.get("/:id",getTheatreDetails)
router.put("/:id",updateTheater)
export default router;