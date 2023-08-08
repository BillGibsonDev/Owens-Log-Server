import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cookieParser from "cookie-parser";
import { UserModel } from "../models/User.js";
import { createTokens, validateAdmin } from "../JWT.js";

const router = express.Router();

export const createUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({email: email });
  if(user){
    res.status(400).json('User already exists')
  } else {
    bcrypt.hash(password, 10).then((hash) => {
      UserModel.create({
        email: email,
        password: hash,
        data: {
          nursings: [],
          pumpings: [],
          feedings: [],
          medications: [],
          changes: [],
        },
        partners: [],
        baby: {},
      })
      .then(() => {
        res.status(200).json('User created');
        
      })
      .catch((err) => {
        if (err) {
          res.status(400).json({ error: err });
        }
      });
    });
  }
};

export const loginUser = async (req, res) =>{
  const { email, password } = req.body;
  const currentDay = new Date();
  const user = await UserModel.findOne({email: email });
  const accessToken = createTokens(user);
  const updateUser = await UserModel.findOneAndUpdate(
    { email: email }, 
    { token: accessToken, lastLogin: currentDay }, 
    { new: true }
  )
  if (!user) res.status(400).json({ error: "Wrong Username or Password!" });
  const userPassword = user.password;
  try {
    bcrypt.compare(password, userPassword).then((match) => {
      if (!match) {
        res
          .status(400)
          .json({ error: "Wrong Username or Password!" });
      } else {
        res.send({token: accessToken, id: user._id});
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// not tested \0/
export const updateUser = async (req, res) =>{
  const { email, password, newpassword} = req.body;
  const userPassword = user.password;
  bcrypt.compare(password, userPassword).then((match) => {
    if (!match) {
      res
        .status(400)
        .json({ error: "Wrong Username or Password!" });
    } else {
      UserModel.findOneAndUpdate({email: email },{password: newpassword});
      res.json("User Updated");
    }
  });
};