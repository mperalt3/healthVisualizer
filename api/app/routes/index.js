import express from 'express';
import counties from './countiesRoutes';
import diseases from './diseasesRoutes';
import states from './statesRoutes';
import statistics from './statisticsRoutes';

const router = express.Router();

router.use('/counties', counties);
router.use('/diseases', diseases);
router.use('/states', states);
router.use('/statistics', statistics);

export default router;
