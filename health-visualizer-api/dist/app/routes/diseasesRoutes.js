'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _diseasesController = require('../controllers/api/v1/diseasesController');

var _diseasesController2 = _interopRequireDefault(_diseasesController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _diseasesController2.default.index);
router.get('/:id', _diseasesController2.default.show);

exports.default = router;