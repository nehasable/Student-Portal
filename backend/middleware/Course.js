import express from "express"
import mongoose from 'mongoose';
import Course from '../models/Course.js'
import User from '../models/User.js'
import moment from 'moment';
const app=express()



export const createCourse = async (req, res) => {
  const { name, date,startTime, endTime, teacherName, studentId } = req.body;

  try {
    // console.log("Creating course with data:", { name, startTime, endTime, teacherName, studentId });

    // Validate studentId format
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: 'Invalid student ID format' });
    }

    // Find the teacher by name and role
    const teacher = await User.findOne({ name: teacherName, role: 'teacher' });

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    // const formattedDate = moment(date, 'MM DD YYYY').format('MM DD YYYY');

    // Create new course
    const newCourse = new Course({
      name,
      date,
      startTime,
      endTime,
      teachers: new mongoose.Types.ObjectId(teacher._id), // new
      students: studentId,
    });

    await newCourse.save();
    console.log("New course created:", newCourse);
    console.log(date);
    res.status(201).json(newCourse);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'again Server Error' });
  }
};

//FETCH
export const getCoursesByStudent = async (req, res) => {
    const { studentId } = req.params;
    console.log(studentId)
    try {
      const courses = await Course.find({ students: studentId })
      res.status(200).json(courses);
    }catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ message: 'fetching Server Error' });
    }
  };
//UPDATE  
export const updateCourse=async(req,res)=>{
    const {courseId}=req.params;
    const {status}=req.body
    console.log(courseId)
    try{
        console.log("hello")
        const updatedCourse=await Course.findByIdAndUpdate(courseId,
            {status},
            {new:true}
        )
        res.status(200).json(updatedCourse)
    }catch(error){
        console.error('Error fetching courses:', error);
      res.status(500).json({ message: 'Server Error' });
    }
}
export const getCoursesByTeacher = async (req, res) => {
  const { teacherId } = req.params;
  console.log(teacherId);
  try {
    const courses = await Course.find({ teachers: teacherId })
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses for teacher:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
