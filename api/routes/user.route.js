import express from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  profilePosts,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getUsers); //fetch all users
router.get("/search/:id", verifyToken, getUser); //fetch one user
router.put("/:id", verifyToken, updateUser); //update user
router.delete("/:id", verifyToken, deleteUser); //delete user
router.get("/profilePosts", verifyToken, profilePosts); //get all posts from one user

export default router;
