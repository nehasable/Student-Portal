import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
const app= express();

dotenv.config();
const connect=async()=>{
    try{
        console.log('MongoDB URI:', process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });

       await mongoose.connect(process.env.MONGO)
        console.log('connect')
    }catch(error){
        console.log(error);
    }
}
mongoose.set('debug', true);
mongoose.connection.on("disconnected", ()=>{
    console.log("mongo disconnected")
})
mongoose.connection.on("connected", ()=>{
    console.log("mongo connected")
})
app.listen(8088, () => {
    connect()
    console.log(`Server running on port `);
})