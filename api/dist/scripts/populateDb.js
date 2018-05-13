'use strict';

var _db = require('../config/db');

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _xlsx = require('xlsx');

var _xlsx2 = _interopRequireDefault(_xlsx);

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

function returnResult(err, result) {
  if (err) {
    console.log("error" + err);
  }
  console.log("resultado:" + result);
  return result;
}

async function loadDiabetesPrevalence() {
  console.log("loadDiabetesPrevalence");
  var workbook = _xlsx2.default.readFile('dist/data_source/DM_PREV_ALL_STATES.xlsx');
  var fullDocument = _xlsx2.default.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });
  var disease = await _disease2.default.findOneOrCreate({ name: "Obesity" });
  var years = fullDocument[0].slice(1).filter(function (cell) {
    return cell != "";
  });
  var row = 2;
  var column = 0;
  while (row < fullDocument.length) {
    var state = await _state2.default.findOneOrCreate({ name: fullDocument[row][column] }, returnResult);
    var county = await _county2.default.findOneOrCreate({
      fipsCode: fullDocument[row][column + 1],
      name: fullDocument[row][column + 2],
      stateId: state._id
    }, returnResult);
    column = column + 3;
    var year = 0;
    while (column < fullDocument[row].length) {
      var stats = new _statistic2.default({
        countyId: county._id,
        diseaseId: disease._id,
        statisticDate: new Date(years[year]),
        totalCount: fullDocument[row][column],
        percent: fullDocument[row][column + 1],
        lowerConfidenceLimit: fullDocument[row][column + 2],
        upperConfidenceLimit: fullDocument[row][column + 3],
        ageAdjustedPercent: fullDocument[row][column + 4],
        ageLowerConfidenceLimit: fullDocument[row][column + 5],
        ageUpperConfidenceLimit: fullDocument[row][column + 6],
        genderScope: "A"
      });
      stats.save(function (err, result) {
        if (err) {
          console.log(err);
        }
      });
      column = column + 7;
      year++;
    }
    column = 0;
    row++;
  }
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

_async2.default.series([clearModels, loadDiabetesPrevalence], function (err, results) {
  if (err) {
    console.log('FINAL ERR: ' + err);
  } else {
    console.log('loaded success');
  }
  // mongoose.connection.close();
});