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
  var id = req.params.id;

  _county2.default.findById(id).exec(function (err, county) {
    if (err) {
      return res.status(500).send({
        msg: 'county not found',
        success: false
      });
    }
    return res.status(200).send({
      msg: 'Ok',
      success: true,
      county: county
    });
  });
};

// Update a County. Mark as favorite
exports.update = function (req, res) {
  var _req$params = req.params,
      favorite = _req$params.favorite,
      id = _req$params.id;

  _county2.default.findOneAndUpdate({ _id: id }, { $set: { isFavorite: isFavorite } }, { new: true }, function (err, county) {
    if (err) {
      return res.status(500).send({
        msg: 'county not found',
        success: false
      });
    }
    console.log(county);
    return res.status(200).send({
      msg: 'Ok',
      success: true,
      county: county
    });
  });
};