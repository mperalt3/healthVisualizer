import express from 'express';
import statesController  from '../controllers/api/v1/statesController';

const router = express.Router();

router.get('/', statesController.index);
router.get('/:id', statesController.show);

export default router;
