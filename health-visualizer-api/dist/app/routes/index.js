'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _countiesRoutes = require('./countiesRoutes');

var _countiesRoutes2 = _interopRequireDefault(_countiesRoutes);

var _diseasesRoutes = require('./diseasesRoutes');

var _diseasesRoutes2 = _interopRequireDefault(_diseasesRoutes);

var _statesRoutes = require('./statesRoutes');

var _statesRoutes2 = _interopRequireDefault(_statesRoutes);

var _statisticsRoutes = require('./statisticsRoutes');

var _statisticsRoutes2 = _interopRequireDefault(_statisticsRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/counties', _countiesRoutes2.default);
router.use('/diseases', _diseasesRoutes2.default);
router.use('/states', _statesRoutes2.default);
router.use('/statistics', _statisticsRoutes2.default);

// This function validate any parameter called id as a valid mongoose ObjectID
router.param('id', function (req, res, next, name) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      msg: 'Bad request. id is not valid',
      success: false
    });
  }
  next();
});

exports.default = router;