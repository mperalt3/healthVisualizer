'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _statesController = require('../controllers/api/v1/statesController');

var _statesController2 = _interopRequireDefault(_statesController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _statesController2.default.index);
router.get('/:id', _statesController2.default.show);

exports.default = router;