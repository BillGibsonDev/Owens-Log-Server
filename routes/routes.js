import express from 'express';
import dotenv from 'dotenv';

import { getAllData, getAllChangeData, getAllNursingData, getAllFeedingData, getAllMedicationData, getAllPumpingData } from '../controllers/DataController.js';
import { createUser, loginUser, updateUser } from '../controllers/UserController.js';
import { createEvent, updateEvent, deleteEvent } from '../controllers/EventController.js.js';
import { validateToken } from '../JWT.js';

const router = express.Router();
dotenv.config();

// users
router.post(`/users/login`, loginUser);
router.post(`/validateTokens`, validateToken);
router.post(`/users/:userId/update`, updateUser);
router.post(`/users/create-user`, createUser);

// data
router.get(`/data/:userId`, getAllData);
router.get(`/data/:userId/changes`, getAllChangeData);
router.get(`/data/:userId/pumpings`, getAllPumpingData);
router.get(`/data/:userId/medications`, getAllMedicationData);

// baby data
router.get(`/data/:userId/baby`, getAllFeedingData);


// events
router.post(`/data/:userId/create/:event`, createEvent);


// nursing
router.get(`/data/:userId/nursings`, getAllNursingData);
router.post(`/data/:userId/update/:event/:eventId`, updateEvent);
router.post(`/data/:userId/delete/:event/:eventId`, updateEvent);

// pumpings


// feedings
router.get(`/data/:userId/feedings`, getAllFeedingData);

// medications


export default router;