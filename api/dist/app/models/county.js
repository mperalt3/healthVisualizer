'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var countySchema = new Schema({
  stateId: {
    type: Schema.Types.ObjectId,
    ref: 'State',
    required: true
  },

  name: {
    type: String,
    trim: true,
    lowercase: true
  },

  isFavorite: {
    type: Boolean,
    enum: [true, false],
    default: false
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

countySchema.statics.findOneOrCreate = function findOneOrCreate(condition, callback) {
  var self = this;
  self.findOne(condition, function (err, result) {
    return result ? callback(err, result) : self.create(condition, function (err, result) {
      return callback(err, result);
    });
  });
};

var County = _mongoose2.default.model('County', countySchema);
exports.default = County;