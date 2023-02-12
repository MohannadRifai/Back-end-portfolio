import jwt  from "jsonwebtoken";

//to hash our pasword we need bcrypt
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";

// to register new user by using POST and it will be /api/users
export const registerUser = asyncHandler(async (req, res) => {
  //FOR THE BODY DATA
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //to check if the user exists and to find him/her by email

  const userExists = await User.findOne({ name });
  // if the user already exist, we dont want to reregester him/her
  if (userExists) {
    res.status(400);
    throw new Error(" User already exists");
  }
  // Hash pasword
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create the user
  const user = await User.create({
    name,
    password: hashedPassword,
  });
  //to check if user was created
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// to authenticate a user by using POST and it will be /api/users/login
export const loginUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body;
  //check for user email and the pass to login
  const user = await User.findOne({ name });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// to get user data by using GET and it will be /api/users/me
export const getMe = asyncHandler(async (req, res) => {
  const { _id, name } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
  });
});

//a function to generate a token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

