import express from 'express';
import statesController  from '../controllers/statesController';

const router = express.Router();

router.get('/', statesController.index);
router.get('/:id', statesController.show);


export default router;
