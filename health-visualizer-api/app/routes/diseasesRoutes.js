import express from 'express';
import diseasesController  from '../controllers/diseasesController';

const router = express.Router();

router.get('/', diseasesController.index);
router.get('/:id', diseasesController.show);


export default router;
