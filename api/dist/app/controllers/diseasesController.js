'use strict';

var _disease = require('../models/disease');

var _disease2 = _interopRequireDefault(_disease);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Display list of all Diseases.
exports.index = function (req, res) {
  _disease2.default.find().sort({ name: -1 }).exec(function (err, diseases) {
    if (err) {
      res.status(500).send({
        msg: 'DB conection failed',
        success: false
      });
    }
    res.status(200).send({
      msg: 'Ok',
      success: true,
      diseases: diseases
    });
  });
};

// Display a Disease.
exports.show = function (req, res) {
  var id = req.params.id;

  _disease2.default.findById(id).exec(function (err, disease) {
    if (err) {
      return res.status(500).send({
        msg: 'disease not found',
        success: false
      });
    }
    return res.status(200).send({
      msg: 'Ok',
      success: true,
      disease: disease
    });
  });
};