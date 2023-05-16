import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

app.use('/');

mongoose.connect(   
  process.env.NODE_ENV_MONGO_KEY, {
    useNewUrlParser: true,
  }
);

app.listen(port, host, () => {
  console.log(`Server active on ${port}`);
}); 
