import express from "express"
import mongoose from "mongoose";
import User from "../models/User.js";
import { createUser, signInUser } from "../middleware/User.js";
const router = express.Router();
const app=express()

router.post('/user',createUser)
router.post('/signin', signInUser);
export default router;