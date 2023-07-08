import mongoose from 'mongoose';
import { DayModel } from "../models/Day.js";
import { CronJob } from 'cron';

export const getDays = async (req, res) => { 
    try {
        const days = await DayModel.find(); 
        res.status(200).json(days.reverse().slice(0,13));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getDay = async (req, res) => { 
    const { dateId } = req.params;
    try {
        const day = await DayModel.findById(dateId);
        res.status(200).json(day);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createDay = async () => {
    const currentDate = new Date();
    const dayCheck = DayModel.find({ date: currentDate });
    if(!dayCheck){
        const newDay = new DayModel({ date: currentDate })
        try {
            await newDay.save();
            return "Day Created!";
        } catch (error) {
            return "Error - Day Not Created!";
        } 
    } else {
        console.log(dayCheck.date)
        console.log('Day already created!')
    }
}

const dayJob = new CronJob("03 * * * *", () => {
  createDay();
  console.log('day job started');
},
  null,
  true,
  'America/New_York'
);

dayJob.start();