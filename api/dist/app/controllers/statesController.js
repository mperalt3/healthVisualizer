'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _state = require('../models/state');

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Display list of all States sorted by name.
exports.index = async function (req, res) {
  _state2.default.find().sort({ name: -1 }).exec(function (err, states) {
    if (err) {
      res.status(500).send({
        msg: 'DB conection failed',
        success: false
      });
    }
    res.status(200).send({
      msg: 'Ok',
      success: true,
      states: states
    });
  });
};

// Display a State.
exports.show = async function (req, res) {
  var id = req.params.id;

  _state2.default.findById(id).exec(function (err, state) {
    if (err) {
      return res.status(500).send({
        msg: 'state not found',
        success: false
      });
    }
    return res.status(200).send({
      msg: 'Ok',
      success: true,
      state: state
    });
  });
};