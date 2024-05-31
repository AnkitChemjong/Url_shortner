import express from 'express';
import {handleGenerateNewShortURL,handleUpdate,handleGetAnalytics} from '../controllers/url.js';
const router=express.Router();

router.post('/',handleGenerateNewShortURL);
router.get('/:shortId',handleUpdate);
router.get('/analytics/:shortId',handleGetAnalytics)

export default router;