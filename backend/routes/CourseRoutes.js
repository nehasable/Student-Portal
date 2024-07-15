import express from "express"
import mongoose from "mongoose";
import { createCourse, getCoursesByStudent, updateCourse } from "../middleware/Course.js";
const router = express.Router();
const app=express()

router.post('/',createCourse)
router.get('/:studentId',getCoursesByStudent)
router.get('/teacher/:courseId',updateCourse)

export default router;