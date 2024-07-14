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
      required: true,
    },
    mobileNo:{
      type: Number,
      required: true,
    }
  },

);

export default mongoose.model("user",userSchema );