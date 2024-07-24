import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
const app = express();


export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        res.status(403).json({})
    }
    const token = authHeader.split(' ')[1]
    console.log(token)
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
      
            req.teacherId = decoded.teacherId
            console.log("middleware",req.teacherId)
            
            next()
        

    }
    catch (err) {
        return res.status(403).json({
            message:"not found"
        });
    }
}
