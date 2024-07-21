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

    // validate studentId format
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: 'Invalid student ID format' });
    }

    // fnd the teacher by name and role
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
  const { page = 1, limit = 3, search = '' } = req.query; // default 

  try {
      const pageNumber = parseInt(page, 10) || 1; 
      const limitNumber = parseInt(limit, 3) || 3; 
    
      const skip = (pageNumber - 1) * limitNumber;
      const query = { students: studentId };
     
      if (search) {
          query.name = { $regex: search, $options: 'i' }; 
      }
      const totalCourses = await Course.countDocuments(query);

      const courses = await Course.find(query)
          .skip(skip)
          .limit(limitNumber);

    
      const totalPages = Math.ceil(totalCourses / limitNumber);

      res.status(200).json({
          courses,
          totalPages
      });
  } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ message: 'Server Error' });
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
//COURSES BY teacgher
// export const getCoursesByTeacher = async (req, res) => {
//   const { teacherId } = req.params;
//   const { startDate, endDate,page=1,limit=2,search='' } = req.query;               

//   console.log("params",teacherId, startDate, endDate);
//   try {
//     const searchFilter = new RegExp(search, 'i')
//     const courses = await Course.find({ teachers: teacherId ,
//       date: {
//       $gte: startDate,
//       $lte: endDate
   
//     }}) .skip((page - 1) * limit)
//      .limit(parseInt(limit))  // Populate student details.exec()
//     console.log(courses);

//     const teacherIds = [...new Set(courses.flatMap(course => course.teachers))];
//     const studentIds = [...new Set(courses.flatMap(course => course.students))];

//     const teachers = await User.find({
//       _id: { $in: teacherIds },
//       $or: [
//         { name: { $regex: search, $options: 'i' } },
//         { mobileNo: { $regex: search, $options: 'i' } }
//       ]
//     });

//     // Fetch student details
//     const students = await User.find({
//       _id: { $in: studentIds },
//       $or: [
//         { name: { $regex: search, $options: 'i' } },
//         { mobileNo: { $regex: search, $options: 'i' } }
//       ]
//     })

//     const totalCourses = await Course.countDocuments({
//       teachers: teacherId,
//        name: { $regex: search, $options: 'i' },
//         date: {
//         $gte: startDate,
//         $lte: endDate
//       }
//     });
// console.log(totalCourses)
// console.log(students,teachers)
//        res.json({
//       courses,
//       teachers,
//       students,
//       totalPages: Math.ceil(totalCourses / limit)
//     });
//   } catch (error) {
//     console.error('Error fetching courses for teacher:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

export const getCoursesByTeacher = async (req, res) => {
  const { teacherId } = req.params;
  const { startDate, endDate, page = 1, limit = 2, search = '' } = req.query;

  try {

    let query={
                 teachers: teacherId,
                date: { $gte: startDate, $lte: endDate },
    }
    
    if (search) {
      // Find students matching the search criteria
      const students = await User.find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { mobileNo: { $regex: search, $options: 'i' } }
        ]
      });

      // Add conditions to the query for course name and students
      if(students.length>1){
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { students: { $in: students.map(student => student._id) } }
      ];
    }
    }
    console.log('Query', query)
    const courses = await Course.find(
    query
      // name: { $regex: search, $options: 'i' } // Search by course name
    )
    .skip((page - 1) * limit)
    .limit(parseInt(limit)).populate('students');
    // .populate('teachers')

    // const teacherIds = [...new Set(courses.flatMap(course => course.teachers))];
    // const studentIds = [...new Set(courses.flatMap(course => course.students))];
  
    // const teachers = await User.find({
    //   _id: { $in: teacherIds },
    //   $or: [
    //     { name: { $regex: search, $options: 'i' } },
    //     { mobileNo: { $regex: search, $options: 'i' } }
    //   ]
    // });
    // const students = await User.find({
    //   _id: { $in: studentIds },
    //   $or: [
    //     { name: { $regex: search, $options: 'i' } },
    //     { mobileNo: { $regex: search, $options: 'i' } }
    //   ]
    // });
    console.log("found",courses)
    const totalCourses = await Course.countDocuments(query);
    res.json({
      courses,
      totalPages: Math.ceil(totalCourses / limit),
    });
  } catch (error) {
    console.error('Error fetching courses for teacher:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};