import mongoose from 'mongoose';
import { UserModel } from "../models/Day.js";
import { validateAdmin, validateUser } from '../JWT.js';

export const getMedication = async (req, res) => {
    const { dateId, medicationId } = req.params;
    try {
        const medication = await UserModel.findOne({ 
            medications: {
                $elemMatch: { _id: medicationId}}},
            { 
                medications:{ 
                    $elemMatch: { _id: medicationId }
                }
            }
        )
        res.status(200).json(medication);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createMedication = async (req, res) => {
    const { startTime, endTime, milk, nursed, mixed, formula, drank, pee, poop, description, left, right } = req.body;
    const { userId } = req.params;
    // let token = req.headers.authorization;
    // if(validateUser(token)){
        try {
            await UserModel.findOneAndUpdate({ '_id': userId },
                {
                    $push: {
                        'medications': {  
                            startTime: startTime,
                            endTime: endTime,
                            milk: milk,
                            formula: formula,
                            nursed: nursed,
                            left: left,
                            right: right,
                            pee: pee,
                            poop: poop,
                            drank: drank,
                            mixed: mixed,
                            description: description,
                        }
                    }
                }
            )
            res.status(201).json("Medication Created");
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    // } else {
    //     res.status(400).json('Invalid User')
    // }
}

export const updateMedication = async (req, res) => {
    const { userId, medicationId } = req.params;
    const { startTime, endTime, pee, poop, description, drank, mixed, nursed, formula, milk, left, right  } = req.body;
    if (!mongoose.Types.ObjectId.isValid(medicationId)) return res.status(404).send(`No medication with id: ${medicationId}`);
    // let token = req.headers.authorization;
    // if(validateUser(token)){
        try {
            await UserModel.findOneAndUpdate(
                { "_id": userId, "medications._id": medicationId },
                {
                    $set:{
                        "medications.$.description": description,
                        "medications.$.startTime": startTime,
                        "medications.$.endTime": endTime,
                        "medications.$.pee": pee,
                        "medications.$.poop": poop,
                        "medications.$.drank": drank,
                        "medications.$.mixed": mixed,
                        "medications.$.nursed": nursed,
                        "medications.$.right": right,
                        "medications.$.left": left,
                        "medications.$.milk": milk,
                        "medications.$.formula": formula,
                    }
                },
            );
            res.json("Medication Updated");
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    // } else {
    //     res.status(400).json('Invalid');
    // }
} 

export const deleteMedication = async (req, res) => {
    const { userId, medicationId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(medicationId)) return res.status(404).send(`No medication with id: ${medicationId}`);
    // let token = req.headers.authorization;
    // if(validateAdmin(token)){
        try {
            await UserModel.findOneAndUpdate(
                { _id: userId },
                {$pull: { "medications": { _id: medicationId } }},
                { multi: true }
            )
            res.json("Medication Deleted");
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    // } else {
    //     res.status(400).json('Invalid');
    // }
}