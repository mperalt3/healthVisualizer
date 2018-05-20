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
    type: Schema.ObjectId,
    ref: 'State',
    required: true
  },

  name: {
    type: String,
    trim: true,
    lowercase: true
  },

  fipsCode: {
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

// This asynchronous function look for a collection by the condition. If it is found is returned, othewise a new collection with the data in condition is created and returned.
countySchema.statics.findOneOrCreate = async function findOneOrCreate(condition) {
  var self = this;
  var result = await self.findOne(condition);
  if (result) {
    return result;
  } else {
    result = await self.create(condition);
    return result;
  }
};

var County = _mongoose2.default.model('County', countySchema);
exports.default = County;