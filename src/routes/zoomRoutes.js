import express from 'express';
import { createMeeting, getMeetings, deleteMeeting } from '../controllers/zoomController.js';

const router = express.Router();

router.post('/create', createMeeting);
router.get('/list', getMeetings);
router.delete('/delete/:id', deleteMeeting);

export default router;
