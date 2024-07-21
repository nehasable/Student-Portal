import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      
    },
    mobileNo:{
      type: String,
      required: true,
      match: /^[0-9]{10}$/
    }
  },

);

export default mongoose.model("user",userSchema );