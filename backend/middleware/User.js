import express from "express"
import mongoose from "mongoose";
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
const app=express()

export const createUser=async (req,res)=>{
    try{
       
        const newUser= await User.create(req.body)
        res.status(200).json(newUser)
           }catch(error){
               console.log(error)
           }
       
       }
 export const signInUser = async (req, res) => {
    const { name, password, mobileNo } = req.body;
        try {
          const user = await User.findOne({ name, password, mobileNo });
          if (user) {
            const token = jwt.sign({ id: user._id }, 'password', { expiresIn: '1h' });
            console.log(user._id)
            res.status(200).json({ token, user });
          } else {
            res.status(401).json({ message: 'Invalid credentials' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Error signing in', error });
          console.error(error);
        }
      };