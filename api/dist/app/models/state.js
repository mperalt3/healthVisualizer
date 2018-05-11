'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var stateSchema = new Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

stateSchema.statics.findOneOrCreate = function findOneOrCreate(condition, callback) {
  var self = this;
  self.findOne(condition, function (err, result) {
    return result ? callback(err, result) : self.create(condition, function (err, result) {
      return callback(err, result);
    });
  });
};

var State = _mongoose2.default.model('State', stateSchema);
exports.default = State;