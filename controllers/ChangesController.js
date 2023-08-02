import mongoose from 'mongoose';
import { DayModel } from "../models/Data.js";
import { validateAdmin, validateUser } from '../JWT.js';

export const getChanges = async (req, res) => {
    const { dateId, changeId } = req.params;
    try {
        const change = await DayModel.findOne({ 
            changes: {
                $elemMatch: { _id: changeId}}},
            { 
                changes:{ 
                    $elemMatch: { _id: changeId }
                }
            }
        )
        res.status(200).json(change);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createChange = async (req, res) => {
    const { time, pee, poop } = req.body;
    const { dayId } = req.params;
    // let token = req.headers.authorization;
    // if(validateUser(token)){
        try {
            await DayModel.findOneAndUpdate({ '_id': dayId },
                {
                    $push: {
                        'changes': {  
                            time: time,
                            pee: pee,
                            poop: poop,
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

export const updateChange = async (req, res) => {
    const { dayId, changeId } = req.params;
    const { time, pee, poop } = req.body;
    if (!mongoose.Types.ObjectId.isValid(changeId)) return res.status(404).send(`No change with id: ${changeId}`);
    // let token = req.headers.authorization;
    // if(validateUser(token)){
        try {
            await DayModel.findOneAndUpdate(
                { "_id": dayId, "changes._id": changeId },
                {
                    $set:{
                        "changes.$.time": time,
                        "changes.$.pee": pee,
                        "changes.$.poop": poop,
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

export const deleteChange = async (req, res) => {
    const { dayId, changeId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(changeId)) return res.status(404).send(`No change with id: ${changeId}`);
    // let token = req.headers.authorization;
    // if(validateAdmin(token)){
        try {
            await DayModel.findOneAndUpdate(
                { _id: dayId },
                { $pull: { "changes": { _id: changeId } }},
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