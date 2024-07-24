import express from "express"
import mongoose from "mongoose";
import { createCourse, getCoursesByStudent, getCoursesByTeacher, updateCourse } from "../middleware/Course.js";
import { verifyToken } from "../middleware/Auth.js";
import { getTotalCourses } from "../middleware/Total.js";
const router = express.Router();
const app=express()

router.post('/',createCourse)
router.get('/courses',verifyToken, getTotalCourses)
router.get('/:studentId',getCoursesByStudent)
router.put('/teacher/:courseId',updateCourse)
router.get('/teacher/:teacherId',getCoursesByTeacher)


export default router;