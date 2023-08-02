import mongoose from 'mongoose';
import { DayModel } from "../models/Day.js";
import { validateAdmin, validateUser } from '../JWT.js';

export const getNursing = async (req, res) => {
    const { dateId, nursingId } = req.params;
    try {
        const nursing = await DayModel.findOne({ 
            nursings: {
                $elemMatch: { _id: nursingId}}},
            { 
                nursings:{ 
                    $elemMatch: { _id: nursingId }
                }
            }
        )
        res.status(200).json(nursing);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createNursing = async (req, res) => {
    const { time, leftTime, rightTime } = req.body;
    const { dayId } = req.params;
    // let token = req.headers.authorization;
    // if(validateUser(token)){
        try {
            await DayModel.findOneAndUpdate({ '_id': dayId },
                {
                    $push: {
                        'nursings': {  
                            time: time,
                            leftTime: leftTime,
                            rightTime: rightTime,
                        }
                    }
                }
            )
            res.status(201);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    // } else {
    //     res.status(401).json('Invalid User')
    // }
}

export const updateNursing = async (req, res) => {
    const { dayId, nursingId } = req.params;
    const { time, leftTime, rightTime  } = req.body;
    if (!mongoose.Types.ObjectId.isValid(nursingId)) return res.status(404).send(`No nursing with id: ${nursingId}`);
    // let token = req.headers.authorization;
    // if(validateUser(token)){
        try {
            await DayModel.findOneAndUpdate(
                { "_id": dayId, "nursings._id": nursingId },
                {
                    $set:{
                        "nursings.$.time": time,
                        "nursings.$.rightTime": rightTime,
                        "nursings.$.leftTime": leftTime,
                    }
                },
            );
            res.status(200);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    // } else {
    //     res.status(401).json('Invalid');
    // }
} 

export const deleteNursing = async (req, res) => {
    const { dayId, nursingId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(nursingId)) return res.status(404).send(`No nursing with id: ${nursingId}`);
    // let token = req.headers.authorization;
    // if(validateAdmin(token)){
        try {
            await DayModel.findOneAndUpdate(
                { _id: dayId },
                { $pull: { "nursings": { _id: nursingId } }},
                { multi: true }
            )
            res.status(200);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    // } else {
    //     res.status(401).json('Invalid');
    // }
}