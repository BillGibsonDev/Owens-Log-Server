import express from 'express';
import dotenv from 'dotenv';

import { getDays, getDay } from '../controllers/DataController.js';
import { getNote, deleteNote, createNote, updateNote } from '../controllers/NoteController.js';
import { createUser, loginUser, updateUser } from '../controllers/UserController.js';

import { validateToken } from '../JWT.js';

const router = express.Router();
dotenv.config();

// read
router.get(`/${process.env.NODE_ENV_GET_DAY_URL}/:dayId/notes/:noteId`, getNote);

// update
router.post(`/${process.env.NODE_ENV_UPDATE_NOTE_URL}/:dayId/update/:noteId`, updateNote);

// create
router.post(`/${process.env.NODE_ENV_ADD_NOTE_URL}/:dayId/notes`, createNote);

// delete
router.post(`/${process.env.NODE_ENV_DELETE_NOTE_URL}/:dayId/delete/:noteId`, deleteNote);

// users
router.post(`/owens-log/login`, loginUser);
router.post(`/validateTokens`, validateToken);
router.post(`/owens-log/:userId/update`, updateUser);
router.post(`/owens-log/create-user`, createUser);

// data
router.get(`/data/:userId`, getAllData);
router.get(`/data/:userId/feedings`, getAllFeedingData);
router.get(`/data/:userId/nursings`, getAllNursingData);
router.get(`/data/:userId/changes`, getAllChangesData);
router.get(`/data/:userId/pumpings`, getAllPumpingData);
router.get(`/data/:userId/medications`, getAllMedicationData);

// nursing
router.get(`/:userId/nursing/:nursingId`, getNursing);

// pumpings


// feedings


// medications


export default router;