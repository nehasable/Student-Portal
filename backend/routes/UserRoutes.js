import express from "express"
import mongoose from "mongoose";
import User from "../models/User.js";
import { createUser, getTeachers, signInUser } from "../middleware/User.js";
import { verifyToken } from "../middleware/Auth.js";
const router = express.Router();
const app=express()

router.post('/user',createUser)
router.post('/signin', signInUser);
router.get('/teachers',getTeachers)
export default router;