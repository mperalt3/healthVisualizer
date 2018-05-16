import express from 'express';
import diseasesController  from '../controllers/api/v1/diseasesController';

const router = express.Router();

router.get('/', diseasesController.index);
router.get('/:id', diseasesController.show);


export default router;
