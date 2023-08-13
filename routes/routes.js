import express from 'express';
import dotenv from 'dotenv';

import { createUser, loginUser, updateUser } from '../controllers/UserController.js';
import { getAllData, getEventData, createEvent, updateEvent, deleteEvent } from '../controllers/EventController.js.js';
import { validateToken, validateUser } from '../JWT.js';

const router = express.Router();
dotenv.config();

// users
router.post(`/users/login`, loginUser);
router.post(`/validateTokens`, validateToken);
router.post(`/users/:userId/update`, updateUser);
router.post(`/users/create-user`, createUser);

// data
router.get(`/data/:userId`, getAllData);
router.get(`/data/:userId/:event`, getEventData);

// baby data
// router.get(`/data/:userId/baby`, getAllFeedingData);

// events
router.post(`/data/:userId/create/:event`, createEvent);
router.post(`/data/:userId/update/:event/:eventId`, updateEvent);
router.post(`/data/:userId/delete/:event/:eventId`,deleteEvent);



export default router;