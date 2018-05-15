'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseFindOrCreate = require('mongoose-find-or-create');

var _mongooseFindOrCreate2 = _interopRequireDefault(_mongooseFindOrCreate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var diseaseSchema = new Schema({
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

diseaseSchema.statics.findOneOrCreate = async function findOneOrCreate(condition) {
  var self = this;
  var result = await self.findOne(condition);
  if (result) {
    return result;
  } else {
    result = await self.create(condition);
    return result;
  }
};

var Disease = _mongoose2.default.model('Disease', diseaseSchema);
exports.default = Disease;