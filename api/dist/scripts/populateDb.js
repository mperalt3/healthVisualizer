'use strict';

var _db = require('../config/db');

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _county = require('../app/models/county');

var _county2 = _interopRequireDefault(_county);

var _disease = require('../app/models/disease');

var _disease2 = _interopRequireDefault(_disease);

var _state = require('../app/models/state');

var _state2 = _interopRequireDefault(_state);

var _statistic = require('../app/models/statistic');

var _statistic2 = _interopRequireDefault(_statistic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('This script populates database');


var mongoDB = 'mongodb://127.0.0.1/' + _db.databaseConfiguration.name;
// const mongoDB = 'mongodb://127.0.0.1:27017/test'
// const mongoDB = 'mongodb://127.0.0.1/tutorial';
_mongoose2.default.connect(mongoDB);
_mongoose2.default.Promise = global.Promise;
var db = _mongoose2.default.connection;
_mongoose2.default.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var diseases = [];
var states = [];

async function clearModels() {
  console.log("removing existing data");
  await _county2.default.remove({}, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result);
  }).exec();
  await _disease2.default.remove({}, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result);
  }).exec();
  await _state2.default.remove({}, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result);
  }).exec();
  await _statistic2.default.remove({}, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result);
  }).exec();
  console.log("cleared!");
  return;
}

async function loadDiabetesPrevalence() {
  console.log("loadDiabetesPrevalence");
  var disease = await new _disease2.default({ name: "Obesity" });
  await disease.save(function (err) {
    if (err) {
      console.log('ERROR CREATING disease ' + disease);
      return;
    }
    console.log('New disease: ' + disease);
  });
  diseases.push(disease);
  return;
}

async function loadDiabetesPrevalenceByGender() {
  console.log("loadDiabetesPrevalenceByGender");
  var state = await new _state2.default({ name: "Florida" });
  await state.save(function (err) {
    if (err) {
      console.log('ERROR CREATING state ' + state);
      console.log(err);
      return;
    }
    console.log('New state: ' + state);
  });
  states.push(state);
  return;
}

_async2.default.series([
// clearModels,
loadDiabetesPrevalence, loadDiabetesPrevalenceByGender], function (err, results) {
  if (err) {
    console.log('FINAL ERR: ' + err);
  } else {
    console.log('loaded success');
    console.log(diseases);
    console.log(states);
  }
  // mongoose.connection.close();
});