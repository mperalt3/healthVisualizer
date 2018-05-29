import express from 'express';
import statisticsController  from '../controllers/api/v1/statisticsController';

const router = express.Router();

router.get('/:id', statisticsController.show);

export default router;
