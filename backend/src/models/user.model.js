import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type:String,
        minlength:3,
        trim:true,
        required:[true,"Please provide fullname"]
    },
    email:{
        type:String,
        required:[true,"Please provide email"],
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        trim:true,
        required:[true, "Password must be at least 8 characters"],
        minlength:8
    }
},{timestamps: true})

export default mongoose.model("User",userSchema);