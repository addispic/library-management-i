import { Request, Response } from "express";
import mongoose from 'mongoose'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// models
// users
import UsersModel from "../models/users.model";

// utils
import { MAX_AGE, errorHandler, generateToken } from "../utils/users.utils";

// secret
const secret = process.env.SECRET as string;

// get users
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UsersModel.find()
      .sort({ username: 1 })
      .select({ __v: 0, updatedAt: 0, password: 0 });
    return res.status(200).json({ users });
  } catch (err) {
    return res
      .status(400)
      .json({ error: "unexpected error has occurred, get users" });
  }
};

// signup
const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const isSuperAdminExist = await UsersModel.findOne({ role: "super" });

    const newUser = await UsersModel.create({
      username,
      email,
      password,
      role: isSuperAdminExist ? "normal" : "super",
    });
    // cookie
    res.cookie("lm-auth-session", generateToken(newUser._id), {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * MAX_AGE,
    });
    return res.status(200).json({
      newUser: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
        createdAt: newUser.createdAt,
      },
    });
  } catch (err) {
    const errors = errorHandler(err);
    return res.status(400).json({ errors });
  }
};

// login
const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username?.trim()) {
      return res
        .status(400)
        .json({ errors: { username: "Username required" } });
    }
    if (!password) {
      return res
        .status(400)
        .json({ errors: { password: "Password required" } });
    }
    const isUserExist = await UsersModel.findOne({ username });
    if (!isUserExist) {
      return res
        .status(400)
        .json({ errors: { username: "Username not exits" } });
    }

    if (!bcrypt.compareSync(password, isUserExist.password)) {
      return res
        .status(400)
        .json({ errors: { password: "Incorrect password" } });
    }

    // cookie
    res.cookie("lm-auth-session", generateToken(isUserExist._id), {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * MAX_AGE,
    });

    return res.status(200).json({
      user: {
        _id: isUserExist._id,
        username: isUserExist.username,
        email: isUserExist.email,
        role: isUserExist.role,
        status: isUserExist.status,
        createdAt: isUserExist.createdAt,
      },
    });
  } catch (err) {
    const errors = errorHandler(err);
    return res.status(400).json({ errors });
  }
};

// update role
const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { role } = req.body;
    const {_id} = req.params 
    const userId = req._id 
    const isUserSuper = await UsersModel.findById(new mongoose.Types.ObjectId(userId)) 
   
    if(!isUserSuper && isUserSuper?.role !== "super"){
      return res.status(400).json({error: 'unauthorized to update user role'})
    }
    const updatedUser = await UsersModel.findByIdAndUpdate(_id,{role},{new: true,runValidators: true})
    return res.status(200).json({ message: "user role updated successfully" ,_id: updatedUser._id,role: updatedUser.role});
  } catch (err) {
    return res.status(400).json({ message: "update user role error" });
  }
};

// logout
const logout = (req: Request, res: Response) => {
  try {
    res.cookie("lm-auth-session", "", { maxAge: -1 });
    return res.status(200).json({ message: "user logged out successfully" });
  } catch (err) {
    return res
      .status(400)
      .json({ error: "unexpected error has occurred, logout" });
  }
};

// is authenticated
const isAuthenticated = async (req: Request, res: Response) => {
  try {
    const token = req.cookies["lm-auth-session"];
    const { _id } = jwt.verify(token, secret) as any;
    const user = await UsersModel.findById(_id).select({
      __v: 0,
      password: 0,
      updatedAt: 0,
    });
    return res.status(200).json({ user });
  } catch (err) {
    return res
      .status(400)
      .json({ error: "unexpected error has occurred, is-authenticated" });
  }
};

// exports
export { getUsers, signup, login, updateUserRole, logout, isAuthenticated };
