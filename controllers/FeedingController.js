import mongoose from 'mongoose';
import { DayModel } from "../models/Data.js";
import { validateAdmin, validateUser } from '../JWT.js';

export const getFeeding = async (req, res) => {
    const { dateId, feedingId } = req.params;
    try {
        const feeding = await DayModel.findOne({ 
            feedings: {
                $elemMatch: { _id: feedingId}}},
            { 
                feedings:{ 
                    $elemMatch: { _id: feedingId }
                }
            }
        )
        res.status(200).json(feeding);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createFeeding = async (req, res) => {
    const { time, milk, formula, drank } = req.body;
    const { dayId } = req.params;
    // let token = req.headers.authorization;
    // if(validateUser(token)){
        try {
            await DayModel.findOneAndUpdate({ '_id': dayId },
                {
                    $push: {
                        'feedings': {  
                            time: time,
                            milk: milk,
                            formula: formula,
                            drank: drank,
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

export const updateFeeding = async (req, res) => {
    const { dayId, feedingId } = req.params;
    const { time, drank, formula, milk } = req.body;
    if (!mongoose.Types.ObjectId.isValid(feedingId)) return res.status(404).send(`No feeding with id: ${feedingId}`);
    // let token = req.headers.authorization;
    // if(validateUser(token)){
        try {
            await DayModel.findOneAndUpdate(
                { "_id": dayId, "feedings._id": feedingId },
                {
                    $set:{
                        "feedings.$.time": time,
                        "feedings.$.drank": drank,
                        "feedings.$.milk": milk,
                        "feedings.$.formula": formula,
                    }
                },
            );
            res.statsu(200);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    // } else {
    //     res.status(401).json('Invalid');
    // }
} 

export const deleteFeeding = async (req, res) => {
    const { dayId, feedingId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(feedingId)) return res.status(404).send(`No feeding with id: ${feedingId}`);
    // let token = req.headers.authorization;
    // if(validateAdmin(token)){
        try {
            await DayModel.findOneAndUpdate(
                { _id: dayId },
                {$pull: { "feedings": { _id: feedingId } }},
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