import jwt  from "jsonwebtoken";

//to hash our pasword we need bcrypt
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";

// to register new user by using POST and it will be /api/users
export const registerUser = asyncHandler(async (req, res) => {
  //FOR THE BODY DATA
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //to check if the user exists and to find him/her by email

  const userExists = await User.findOne({ user });
  // if the user already exist, we dont want to reregester him/her
  if (userExists) {
    res.status(400);
    throw new Error(" User already exists");
  }
  // Hash pasword
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pwd, salt);

  //create the user
  const usser = await User.create({
    user,
    pwd: hashedPassword,
  });
  //to check if user was created
  if (usser) {
    res.status(201).json({
      _id: usser.id,
      user: usser.user,
      token: generateToken(usser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// to authenticate a user by using POST and it will be /api/users/login
export const loginUser = asyncHandler(async (req, res) => {
  const { user, pwd } = req.body;
  const usser = await User.findOne({ user });

  if (usser && (await bcrypt.compare(pwd, usser.pwd))) {
    res.json({
      _id: usser.id,
      user: usser.user,
      pwd: usser.pwd,
      token: generateToken(usser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// to get user data by using GET and it will be /api/users/me
export const getMe = asyncHandler(async (req, res) => {
  const { _id, user } = await User.findById(req.usser.id);
  res.status(200).json({
    id: _id,
    user,
  });
});

//a function to generate a token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

