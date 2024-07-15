import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
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
    required: true,
    ref:'User.role'
    
  },
  students: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User.role'
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },

 
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
