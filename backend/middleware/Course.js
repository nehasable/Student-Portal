import express from "express";
import mongoose from "mongoose";
import Course from "../models/Course.js";
import User from "../models/User.js";
import moment from "moment";
const app = express();

export const createCourse = async (req, res) => {
  const { name, date, startTime, endTime, teacherName, studentId } = req.body;

  try {
    // console.log("Creating course with data:", { name, startTime, endTime, teacherName, studentId });

    // validate studentId format
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "Invalid student ID format" });
    }

    // fnd the teacher by name and role
    const teacher = await User.findOne({ name: teacherName, role: "teacher" });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
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
    console.error("Error creating course:", error);
    res.status(500).json({ message: "again Server Error" });
  }
};

//FETCH
export const getCoursesByStudent = async (req, res) => {
  const { studentId } = req.params;
  const { page = 1, limit = 6, search = "" } = req.query; // default

  try {
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: 'Invalid Student ID' });
    }
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 6) || 6;
    const skip = (pageNumber - 1) * limitNumber;

    const query = { students: studentId };

    if (search) {
      query.$or = [{ name: { $regex: search, $options: "i" } }];
      const teachers = await User.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { mobileNo: { $regex: search, $options: "i" } },
        ],
      });
      if (teachers.length > 0) {
        query.$or.push({
          teachers: { $in: teachers.map((teacher) => teacher._id) },
        });
      }
    }
    const allCourses = await Course.countDocuments(query).exec();
    const courses = await Course.find(query)
      .skip(skip)
      .limit(limitNumber)
      .populate("teachers")
      .exec();

    // console.log('Courses Found', courses);

    const totalPages = Math.ceil(allCourses / limitNumber);

    res.status(200).json({
      courses,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching courses for students:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//UPDATE
export const updateCourse = async (req, res) => {
  const { courseId } = req.params;
  const { status } = req.body;
  console.log(courseId);
  try {
    console.log("hello");
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { status },
      { new: true }
    );
    res.status(200).json(updatedCourse);
  } catch (error) {
    // console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
//get courses by teacher
export const getCoursesByTeacher = async (req, res) => {
  const { teacherId } = req.params;
  const { startDate, endDate, page = 1, limit = 2, search = "" } = req.query;

  try {
    let query = {
      teachers: teacherId,
      date: { $gte: startDate, $lte: endDate },
    };

    if (search) {
      query.$or = [{ name: { $regex: search, $options: "i" } }];
      const students = await User.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { mobileNo: { $regex: search, $options: "i" } },
        ],
      });
      if (students.length > 0) {
        query.$or.push({
          students: { $in: students.map((student) => student._id) },
        });
      }
    }
    // console.log("QueryYYYYYY", query);
    const courses = await Course.find(
      query
      // name: { $regex: search, $options: 'i' } // search by course name
    )
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate("students");

    console.log("found", courses);
    const totalCourses = await Course.countDocuments(query);
    res.json({
      courses,
      totalPages: Math.ceil(totalCourses / limit),
    });
  } catch (error) {
    // console.error("Error fetching courses for teacher:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//get count

