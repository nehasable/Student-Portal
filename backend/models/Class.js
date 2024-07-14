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
    
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    }
  ],
 
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
