import express from 'express';
import countiesController  from '../controllers/api/v1/countiesController';
import statisticsController from '../controllers/api/v1/statisticsController';
const router = express.Router();

router.get('/', countiesController.index);
router.get('/:id', countiesController.show);
router.put('/:id', countiesController.update);
router.get('/:id/statistics', statisticsController.index);

export default router;
