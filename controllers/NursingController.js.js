import mongoose from 'mongoose';
import { UserModel } from "../models/Day.js";
import { validateAdmin, validateUser } from '../JWT.js';

export const getNursing = async (req, res) => {
    const { dateId, nursingId } = req.params;
    try {
        const nursing = await UserModel.findOne({ 
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
    const { userId } = req.params;
    // let token = req.headers.authorization;
    // if(validateUser(token)){
        try {
            await UserModel.findOneAndUpdate({ '_id': userId },
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
    const { userId, nursingId } = req.params;
    const { time, leftTime, rightTime  } = req.body;
    if (!mongoose.Types.ObjectId.isValid(nursingId)) return res.status(404).send(`No nursing with id: ${nursingId}`);
    // let token = req.headers.authorization;
    // if(validateUser(token)){
        try {
            await UserModel.findOneAndUpdate(
                { "_id": userId, "nursings._id": nursingId },
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
    const { userId, nursingId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(nursingId)) return res.status(404).send(`No nursing with id: ${nursingId}`);
    // let token = req.headers.authorization;
    // if(validateAdmin(token)){
        try {
            await UserModel.findOneAndUpdate(
                { _id: userId },
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