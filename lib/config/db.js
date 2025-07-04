import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://manindersolitaire:mynameismanindersingh@cluster0.kkpgvue.mongodb.net/todo-app')
    console.log("db connected")
}
