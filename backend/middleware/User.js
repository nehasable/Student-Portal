import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
const app = express();

export const createUser = async (req, res) => {
  const { name, password, mobileNo, role } = req.body;
  try {
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobileNo)) {
      return res
        .status(400)
        .json({ message: "Invalid mobile number. It should be 10 digits." });
    }
    const existingUser = await User.findOne({ mobileNo, role });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Mobile number exists for this role." });
    }
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
  }
};
export const signInUser = async (req, res) => {
  const { name, password, mobileNo } = req.body;
  try {
    // if users exist with the same mobile number but different roles
    const users = await User.find({ mobileNo });
    console.log(users.length);
    if (users.length >= 1) {
      // if multiple users exist with the same mobile number
      const roles = users.map((user) => user.role);

      const user = await User.findOne({ password, mobileNo });

      if (user) {
        const token = jwt.sign({ id: user._id }, "password", {
          expiresIn: "1h",
        });
        res.status(200).json({ token, user: user, roles });
      } else {
        res.status(400).json({
          message: "Invalid credentials",
        });
      }

      // res.status(400).json({
      //    message: 'User has multiple roles', roles });
    } else {
      res.json({
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error signing in", error });
    console.error(error);
  }
};
export const getTeachers = async (req, res) => {
  const { name } = req.query;
  console.log(name);
  try {
    const query = {
      $and: [
        { role: "teacher" },
        name ? { name: { $regex: name, $options: "i" } } : {},
      ],
    };
    const teachers = await User.find(query);
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
