import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: false,
    },
    mobileNo:{
      type: Number,
      required: true,
    }
  },

);

export default mongoose.model("schema",userSchema );