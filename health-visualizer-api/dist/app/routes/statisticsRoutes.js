'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _statisticsController = require('../controllers/api/v1/statisticsController');

var _statisticsController2 = _interopRequireDefault(_statisticsController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/:id', _statisticsController2.default.show);

exports.default = router;