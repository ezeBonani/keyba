import express from "express";
import {
  login,
  logout,
  resetPassword,
  register,
} from "../controllers/auth.controller.js";
import { sendPassword } from "../middleware/sendPassword.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/resetPassword", resetPassword, sendPassword);

export default router;
