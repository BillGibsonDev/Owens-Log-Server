import express from 'express';
import dotenv from 'dotenv';

import { getDays, getDay } from '../controllers/DayController.js';
import { getNote, deleteNote, createNote, updateNote } from '../controllers/NoteController.js';
import { createUser, loginUser, updateUser } from '../controllers/UserController.js';

import { validateToken } from '../JWT.js';

const router = express.Router();
dotenv.config();

// read
router.get(`/${process.env.NODE_ENV_GET_DAYS_URL}`, getDays);
router.get(`/${process.env.NODE_ENV_GET_DAYS_URL}/:dayId`, getDay);
router.get(`/${process.env.NODE_ENV_GET_DAY_URL}/:dayId/notes/:noteId`, getNote);
router.post(`/${process.env.NODE_ENV_LOGIN_URL}`, loginUser);
router.post(`/validateTokens`, validateToken);

// update
router.post(`/${process.env.NODE_ENV_UPDATE_NOTE_URL}/:dayId/update/:noteId`, updateNote);
router.post(`/${process.env.NODE_ENV_UPDATE_USER_URL}`, updateUser);

// create
router.post(`/${process.env.NODE_ENV_ADD_NOTE_URL}/:dayId/notes`, createNote);
router.post(`/${process.env.NODE_ENV_REGISTER_URL}`, createUser);

// delete
router.post(`/${process.env.NODE_ENV_DELETE_NOTE_URL}/:dayId/delete/:noteId`, deleteNote);

export default router;