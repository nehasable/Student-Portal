import express from "express";
import mongoose from "mongoose";
import Course from "../models/Course.js";

const app = express();

export const getTotalCourses = async (req, res) => {
    const { startDate, endDate } = req.query;
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    try {
      const decodedToken = jwt.verify(token, 'password');
      const teacherId = decodedToken._id;
  
      if (!mongoose.Types.ObjectId.isValid(teacherId)) {
        return res.status(400).json({ message: 'Invalid Teacher ID' });
      }
  
      if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Start date and end date are required' });
      }
  
      const parsedStartDate = new Date(startDate);
      const parsedEndDate = new Date(endDate);
  
      if (isNaN(parsedStartDate) || isNaN(parsedEndDate)) {
        return res.status(400).json({ message: 'Invalid date format' });
      }
  
      const result = await Course.aggregate([
        {
          $match: {
            teachers: new mongoose.Types.ObjectId(teacherId),
            date: { $gte: parsedStartDate, $lte: parsedEndDate },
            status: { $in: ['pending', 'accepted', 'rejected'] },
          },
        },
        {
          $group: { _id: '$status', count: { $sum: 1 } },
        },
      ]);
  
      res.json(result);
    } catch (error) {
      console.error('Error fetching courses for teacher:', error.message);
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };