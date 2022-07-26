import express from "express"
import { createRoom, deleteRooms, getRooms, getUserRoom, joinRoom, leaveRoom } from "../Controllers/RoomController.js"
const router=express.Router()

router.post("/",createRoom)
router.get("/",getRooms)
router.post("/:id", joinRoom)
router.post("/:id/leave",leaveRoom)
router.get("/find/:firstId/:secondId")
router.get("/:id",getUserRoom)  
router.delete("/:id",deleteRooms)    


export default router;