import mongoose from 'mongoose';
import { UserModel } from "../models/Data.js";
import { validateAdmin, validateUser } from '../JWT.js';

export const getPumping = async (req, res) => {
    const { dateId, pumpingId } = req.params;
    try {
        const pumping = await UserModel.findOne({ 
            pumpings: {
                $elemMatch: { _id: pumpingId}}},
            { 
                pumpings:{ 
                    $elemMatch: { _id: pumpingId }
                }
            }
        )
        res.status(200).json(pumping);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPumping = async (req, res) => {
    const { time, leftAmount, rightAmount } = req.body;
    const { userId } = req.params;
    // let token = req.headers.authorization;
    // if(validateUser(token)){
        try {
            await UserModel.findOneAndUpdate({ '_id': userId },
                {
                    $push: {
                        'pumpings': {  
                            time: time,
                            leftAmount: leftAmount,
                            rightAmount: rightAmount,
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

export const updatePumping = async (req, res) => {
    const { userId, pumpingId } = req.params;
    const { time, leftAmount, rightAmount  } = req.body;
    if (!mongoose.Types.ObjectId.isValid(pumpingId)) return res.status(404).send(`No pumping with id: ${pumpingId}`);
    // let token = req.headers.authorization;
    // if(validateUser(token)){
        try {
            await UserModel.findOneAndUpdate(
                { "_id": userId, "pumpings._id": pumpingId },
                {
                    $set:{
                        "pumpings.$.time": time,
                        "pumpings.$.rightAmount": rightAmount,
                        "pumpings.$.leftAmount": leftAmount,
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

export const deletePumping = async (req, res) => {
    const { userId, pumpingId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(pumpingId)) return res.status(404).send(`No pumping with id: ${pumpingId}`);
    // let token = req.headers.authorization;
    // if(validateAdmin(token)){
        try {
            await UserModel.findOneAndUpdate(
                { _id: userId },
                { $pull: { "pumpings": { _id: pumpingId } }},
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