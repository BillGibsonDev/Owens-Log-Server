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
    const { startTime, endTime, milk, nursed, formula, pee, poop, description } = req.body;
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
                            pee: pee,
                            poop: poop,
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
    const { dateId, noteId } = req.params;
    const { startTime, endTime, pee, poop, description, formula,  } = req.body;
    if (!mongoose.Types.ObjectId.isValid(noteId)) return res.status(404).send(`No note with id: ${noteId}`);
    let token = req.headers.authorization;
    if(validateUser(token)){
        try {
            await DayModel.findOneAndUpdate(
                { "_id": dateId, "notes._id": noteId },
                {
                    $set:{
                        "notes.$.description": description,
                        "notes.$.startTime": startTime,
                        "notes.$.endTime": endTime,
                        "notes.$.pee": pee,
                        "notes.$.poop": poop,
                        "notes.$.nursed": nursed,
                        "notes.$.milk": milk,
                        "notes.$.formula": formula,
                    }
                },
            );
            res.json("Note Updated");
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    } else {
        res.status(400).json('Invalid');
    }
} 

export const deleteNote = async (req, res) => {
    const { dateId, noteId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(noteId)) return res.status(404).send(`No note with id: ${noteId}`);
    let token = req.headers.authorization;
    if(validateAdmin(token)){
        try {
            await DayModel.findOneAndUpdate(
                { _id: dateId },
                { 
                    $set: { lastUpdate: currentDay },
                    $pull: { 'notes': { _id: noteId } } 
                },
                { multi: true }
            )
            res.json("Note Deleted");
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    } else {
        res.status(400).json('Invalid');
    }
}

export const deleteImage = async (req, res) => {
    const { dateId, noteId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(noteId)) return res.status(404).send(`No Note with id: ${noteId}`);
    let token = req.headers.authorization;
    if(validateUser(token)){
        try { 
            await DayModel.findOneAndUpdate(
                { _id: dateId, 'notes._id': noteId },
                {   
                    $set:{
                        lastUpdate: currentDay,
                        "notes.$.images": images,
                        "notes.$.lastUpdate": currentDay,
                    }
                }
            )
            res.json("Image Deleted");
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    }

export const createNoteComment = async (req, res) => {
    const { dateId, noteId } = req.params;
    const { comment, author } = req.body;
    if (!mongoose.Types.ObjectId.isValid(noteId)) return res.status(404).send(`No note with id: ${noteId}`);
    let token = req.headers.authorization;
    if(validateUser(token)){
        try {
            await DayModel.findOneAndUpdate(
                { "_id": dateId, "notes._id": noteId },
                {
                    $set: {
                        lastUpdate: currentDay,
                    },
                    $push:{
                        "notes.$.comments": {
                            comment, 
                            day: currentDay.toLocaleString('en-US', { timeZone: 'America/New_York' }), 
                            author
                        }
                    }
                },
            );
            res.json("Comment created!");
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    } else {
        res.status(400).json('Invalid');
    }
}

export const deleteNoteComment = async (req, res) => {
    const { dateId, noteId, commentId } = req.params;  
    if (!mongoose.Types.ObjectId.isValid(noteId)) return res.status(404).send(`No note with id: ${noteId}`);
    let token = req.headers.authorization;
    if(validateUser(token)){
        try {
            await DayModel.findOneAndUpdate(
                { "_id": dateId, "notes._id": noteId },
                {
                    $set: {
                        lastUpdate: currentDay,
                    },
                    $pull:{
                        "notes.$.comments": {
                            _id: commentId
                        }
                    }
                },
            );
            res.json("Comment Deleted!");
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    } else {
        res.status(400).json('Invalid');
    }
}