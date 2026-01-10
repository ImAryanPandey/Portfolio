import express from 'express';
import { chatWithArc } from '../controllers/chatController.js';

const router = express.Router();

router.post('/', chatWithArc);

export default router;