'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _countiesController = require('../controllers/countiesController');

var _countiesController2 = _interopRequireDefault(_countiesController);

var _statisticsController = require('../controllers/statisticsController');

var _statisticsController2 = _interopRequireDefault(_statisticsController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _countiesController2.default.index);
router.get('/:id', _countiesController2.default.show);
router.put('/:id', _countiesController2.default.update);
router.get('/:id/statistics', _statisticsController2.default.index);

exports.default = router;