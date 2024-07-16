import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
const app = express();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(403).send({ message: 'No token provided.' });

  jwt.verify(token, 'password', (err, decoded) => {
    if (err) return res.status(500).send({ message: 'Failed to authenticate token.' });

    req.userId = decoded.id;
    console.log(req.userId)
    next();
  });
};


