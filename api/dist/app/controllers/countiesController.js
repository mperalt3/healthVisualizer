'use strict';

var _county = require('../models/county');

var _county2 = _interopRequireDefault(_county);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Display list of all Counties, sorted by name.
exports.index = function (req, res) {
  _county2.default.find().sort({ name: -1 }).exec(function (err, counties) {
    if (err) {
      res.status(500).send({
        msg: 'DB conection failed',
        success: false
      });
    }
    res.status(200).send({
      msg: 'Ok',
      success: true,
      counties: counties
    });
  });
};

// Display a County.
exports.show = function (req, res) {
  //Find one and populate with disease and stats
  res.send('NOT IMPLEMENTED: County show');
};

// Update a County.
exports.update = function (req, res) {
  //Mark as favorite
  res.send('NOT IMPLEMENTED: County update');
};