import mongoose from 'mongoose';
import User from './User.js'
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  
  },
  date: {
    type: Date,   //YYYY-MM-DD
    required: true,
  },
  startTime: {
    type: String,
    required: true,
   
  },

  endTime: {
    type: String,
    required: true,
   
  },
  teachers: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'user' 
    },
  students: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user'
   },
  status: { 
    type: String, enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' },

 
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
