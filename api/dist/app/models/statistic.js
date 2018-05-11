'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var statisticSchema = new Schema({
  countyId: {
    type: Schema.Types.ObjectId,
    ref: 'County',
    required: true
  },

  diseaseId: {
    type: Schema.Types.ObjectId,
    ref: 'Disease',
    required: true
  },

  date: {
    Type: Date
  },

  total_count: {
    type: Number
  },

  percent: {
    type: Number
  },

  lowerConfidenceLimit: {
    type: Number
  },

  upperConfidenceLimit: {
    type: Number
  },

  ageAdjustedPercent: {
    type: Number
  },

  ageLowerConfidenceLimit: {
    type: Number
  },

  ageUpperConfidenceLimit: {
    type: Number
  },

  // F: Female, M: Male, A: All
  genderScope: {
    type: String,
    enum: ["F", "M", "A"],
    trim: true,
    default: "A"
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

var Statistic = _mongoose2.default.model('Statistic', statisticSchema);
exports.default = Statistic;