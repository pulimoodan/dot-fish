import express from 'express';
import { getSettings, getStats, updateSetting } from '../controller/SettingController.js';

const router = express.Router();

router.get('/', getSettings);
router.get('/stats', getStats);
router.patch('/:id', updateSetting);

export default router;
