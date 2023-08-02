import mongoose from 'mongoose';
import { UserModel } from '../models/User.js';

export const getAllData = async (req, res) => { 
    const { userId } = req.params;
    try {
        const user = await UserModel.findById(userId); 
        res.status(200).json(user.data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getAllFeedingData = async (req, res) => { 
    const { userId } = req.params;
    try {
        const user = await UserModel.findById(userId); 
        res.status(200).json(user.data.feedings);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getAllNursingData = async (req, res) => { 
    const { userId } = req.params;
    try {
        const user = await UserModel.findById(userId); 
        res.status(200).json(user.data.nursings);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getAllPumpingData = async (req, res) => { 
    const { userId } = req.params;
    try {
        const user = await UserModel.findById(userId); 
        res.status(200).json(user.data.pumpings);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getAllChangeData = async (req, res) => { 
    const { userId } = req.params;
    try {
        const user = await UserModel.findById(userId); 
        res.status(200).json(user.data.changes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getAllMedicationData = async (req, res) => { 
    const { userId } = req.params;
    try {
        const user = await UserModel.findById(userId); 
        res.status(200).json(user.data.medications);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}