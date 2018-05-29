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

// This function validate any parameter called id as a valid mongoose ObjectID
router.param('id', function(req, res, next, name) {
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).send({
      msg: 'Bad request. id is not valid',
      success: false
    });
  }
  next();
});

export default router;
