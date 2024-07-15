import express from "express"

import Course from '../models/Course.js'
import User from '../models/User.js'

const app=express()


export const createCourse = async (req, res) => {
    const { name, startTime, endTime, teacherName, studentId } = req.body;
  
    try {
      // find the teacher by name and role
      const teacher = await User.findOne({ name: teacherName, role: 'teacher' });     //teacher must be existing for course
  
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
  
      // create new course
      const newCourse = new Course({
        name,
        startTime,
        endTime,
        teachers: teacher._id,   //id of teacher assigned to course ref by teachers role
        students: [studentId],  // adding the logged-in student to the course,booked
      });
  
      await newCourse.save();
  
      res.status(201).json(newCourse);
    }
    
    catch (error) {
      console.error('Error creating course:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
export const getCoursesByStudent = async (req, res) => {
    const { studentId } = req.params;
  
    try {
      const courses = await Course.find({ students: studentId });
      res.status(200).json(courses);
    }catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
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