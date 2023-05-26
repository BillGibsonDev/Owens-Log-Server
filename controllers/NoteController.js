import mongoose from 'mongoose';
import { DayModel } from "../models/Day.js";
import { validateAdmin, validateUser } from '../JWT.js';

export const getNote = async (req, res) => {
    const { dateId, noteId } = req.params;
    try {
        const note = await DayModel.findOne({ 
            notes: {
                $elemMatch: { _id: noteId}}},
            { 
                notes:{ 
                    $elemMatch: { _id: noteId }
                }
            }
        )
        res.status(200).json(note);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createNote = async (req, res) => {
    const { startTime, endTime, milk, nursed, formula, drank, pee, poop, description, left, right } = req.body;
    const { dayId } = req.params;
    console.log(dayId)
    console.log(req)
    // let token = req.headers.authorization;
    // if(validateUser(token)){
        try {
            await DayModel.findOneAndUpdate({ '_id': dayId },
                {
                    $push: {
                        'notes': {  
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
            res.status(201).json("Note Created");
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    // } else {
    //     res.status(400).json('Invalid User')
    // }
}

export const updateNote = async (req, res) => {
    const { dayId, noteId } = req.params;
    const { startTime, endTime, pee, poop, description, drank, mixed, nursed, formula, milk, left, right  } = req.body;
    if (!mongoose.Types.ObjectId.isValid(noteId)) return res.status(404).send(`No note with id: ${noteId}`);
    // let token = req.headers.authorization;
    // if(validateUser(token)){
        try {
            await DayModel.findOneAndUpdate(
                { "_id": dayId, "notes._id": noteId },
                {
                    $set:{
                        "notes.$.description": description,
                        "notes.$.startTime": startTime,
                        "notes.$.endTime": endTime,
                        "notes.$.pee": pee,
                        "notes.$.poop": poop,
                        "notes.$.drank": drank,
                        "notes.$.mixed": mixed,
                        "notes.$.nursed": nursed,
                        "notes.$.right": right,
                        "notes.$.left": left,
                        "notes.$.milk": milk,
                        "notes.$.formula": formula,
                    }
                },
            );
            res.json("Note Updated");
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    // } else {
    //     res.status(400).json('Invalid');
    // }
} 

export const deleteNote = async (req, res) => {
    const { dayId, noteId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(noteId)) return res.status(404).send(`No note with id: ${noteId}`);
    // let token = req.headers.authorization;
    // if(validateAdmin(token)){
        try {
            await DayModel.findOneAndUpdate(
                { _id: dayId },
                {$pull: { "notes": { _id: noteId } }},
                { multi: true }
            )
            res.json("Note Deleted");
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    // } else {
    //     res.status(400).json('Invalid');
    // }
}