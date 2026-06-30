import bcrypt from "bcrypt";
import mongoose from "mongoose";
import validator from "validator";
import validate from "../utils/validate.js";
import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});

    if (allUsers.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Users not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Users Found", users: allUsers });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Get All User Error",error });
  }
};

export const createUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const { hasError, errors } = validate(fullname, email, password);

    if (hasError) {
      return res.status(400).json({ success: false, errors });
    }

    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User Already exist with this email" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname,
      email,
      password: passwordHash
    });

      return res.status(201).json({
      success: true,
      message:
        "User Registered Succesfully. Check your email to verify your account.",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Create User Error" ,error});
  }
};

export const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, email, password } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid user id" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
   
    if (fullname) {
      if (!validator.isLength(fullname, { min: 3, max: 16 })) {
        return res.status(400).json({
          success: false,
          message: "Fullname must be between 3 and 16 characters",
        });
      }
      user.fullname = fullname;
    }

    if (email) {
      if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: "Invalid email address" });
      }
     
      const emailTaken = await User.findOne({ email, _id: { $ne: id } });
      if (emailTaken) {
        return res.status(400).json({ success: false, message: "Email already in use" });
      }

      user.email = email;
    }

    if (password) {
      if (
        !validator.isStrongPassword(password, {
          minLength: 8,
          minNumbers: 1,
          minLowercase: 1,
          minUppercase: 1,
          minSymbols: 1,
        })
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Password must be at least 8 characters with uppercase, lowercase, number, and symbol",
        });
      }
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Edit User Error", error });
  }
};

export const removeUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid user id" });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User Removed Successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Remove User Error", error });
  }
};

