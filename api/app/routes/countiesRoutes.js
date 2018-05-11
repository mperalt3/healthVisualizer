import express from 'express';
import countiesController  from '../controllers/countiesController';

const router = express.Router();

router.get('/', countiesController.index);
router.get('/:id', countiesController.show);
router.put('/:id', countiesController.update);

export default router;
