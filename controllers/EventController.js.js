import mongoose from 'mongoose';
import { UserModel } from "../models/User.js";
import { validateUser } from '../JWT.js';

export const getAllData = async (req, res) => { 
    const { userId } = req.params;
    try {
        const user = await UserModel.findById(userId); 
        res.status(200).json(user.data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getEventData = async (req, res) => { 
    const { userId, event } = req.params;
    try {
        const user = await UserModel.findById(userId); 

        let eventData;

        if( event === 'Nursing'){ eventData = user.data.nursings };
        if( event === 'Pumping'){ eventData = user.data.pumpings };
        if( event === 'Feeding'){ eventData = user.data.feedings };
        if( event === 'Change'){ eventData = user.data.changes };
        if( event === 'Medication'){ eventData = user.data.medications };

        res.status(200).json(eventData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createEvent = async (req, res) => {
    const { data } = req.body;
    const { userId } = req.params;
    let token = req.headers.authorization;
    try {
        const user = await UserModel.findOne({ '_id': userId });
        if (!user) {  return res.status(404).json('User not found'); };
        if (!validateUser(token)) { return res.status(401).json('Invalid User'); };

        if( data.event === 'Nursing'){ user.data.nursings.unshift(data) }
        if( data.event === 'Pumping'){ user.data.pumpings.unshift(data) }
        if( data.event === 'Feeding'){ user.data.feedings.unshift(data) }
        if( data.event === 'Change'){ user.data.changes.unshift(data) }
        if( data.event === 'Medication'){ user.data.medications.unshift(data) }

        await user.save();

        res.status(201).json(`${data.event} Added`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateEvent = async (req, res) => {
    const { data } = req.body;
    const { userId, eventId } = req.params;
    let token = req.headers.authorization;
    try {
        const user = await UserModel.findOne({ '_id': userId });
        if (!user) {  return res.status(404).json('User not found'); };
        if (!validateUser(token)) { return res.status(401).json('Invalid User'); };

        if( data.event === 'Nursing'){ 
            let index = user.data.nursings.findIndex(event => event._id.toString() === eventId);
            if(index < 0){ index = 0 };
            user.data.nursings[index].set(data);
        }

        if( data.event === 'Pumping'){ 
            let index = user.data.pumpings.findIndex(event => event._id.toString() === eventId);
            if(index < 0){ index = 0 };
            user.data.pumpings[index].set(data);
        }
        
        if( data.event === 'Feeding'){ 
            let index = user.data.feedings.findIndex(event => event._id.toString() === eventId);
            if(index < 0){ index = 0 };
            user.data.feedings[index].set(data);
        }

        if( data.event === 'Medication'){ 
            let index = user.data.medications.findIndex(event => event._id.toString() === eventId);
            if(index < 0){ index = 0 };
            user.data.medications[index].set(data);
        }

        if( data.event === 'Change'){ 
            let index = user.data.changes.findIndex(event => event._id.toString() === eventId);
            if(index < 0){ index = 0 };
            user.data.changes[index].set(data);
        }

        user.save();

        res.status(201).json(`${data.event} Added`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteEvent = async (req, res) => {
    const { data } = req.body;
    const { userId, eventId } = req.params;
    let token = req.headers.authorization;
    try {
        const user = await UserModel.findOne({ '_id': userId });
        if (!user) { return res.status(404).json('User not found'); };
        if (!validateUser(token)) { return res.status(401).json('Invalid User'); };

        if( data.event === 'Nursing'){ 
            let index = user.data.nursings.findIndex(event => event._id.toString() === eventId);
            if(index < 0){ index = 0 };
            user.data.nursings[index].set(data);
        }

        if( data.event === 'Pumping'){ 
            let index = user.data.pumpings.findIndex(event => event._id.toString() === eventId);
            if(index < 0){ index = 0 };
            user.data.pumpings[index].set(data);
        }
        
        if( data.event === 'Feeding'){ 
            let index = user.data.feedings.findIndex(event => event._id.toString() === eventId);
            if(index < 0){ index = 0 };
            user.data.feedings[index].set(data);
        }

        if( data.event === 'Medication'){ 
            let index = user.data.medications.findIndex(event => event._id.toString() === eventId);
            if(index < 0){ index = 0 };
            user.data.medications[index].set(data);
        }

        if( data.event === 'Change'){ 
            let index = user.data.changes.findIndex(event => event._id.toString() === eventId);
            if(index < 0){ index = 0 };
            user.data.changes[index].set(data);
        }

        user.save();

        res.status(201).json(`${data.event} Added`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};