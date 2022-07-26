import  express  from "express";
import { blockUser, deleteUser, followUser, getAllUser, getUser, UnblockUser, unFollowUser, updateUser } from "../Controllers/UserController.js";
import authMiddleWare from "../Middleware/authMiddleware.js";
const router=express.Router();
router.get("/",getAllUser) 
router.get("/:id",getUser)
router.put("/:id",authMiddleWare, updateUser)
router.delete("/:id",authMiddleWare,deleteUser)
router.put("/:id/follow",authMiddleWare ,followUser)
router.put("/:id/unfollow",authMiddleWare,unFollowUser)
router.put("/:id/block" ,blockUser)
router.put("/:id/unblock" ,UnblockUser)
export default router;