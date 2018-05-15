'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadDiabetesPrevalence = loadDiabetesPrevalence;
exports.loadDiabetesPrevalenceByGender = loadDiabetesPrevalenceByGender;

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

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

// This function load data from DM_PREV_ALL_STATES.xlsx file
async function loadDiabetesPrevalence() {
  console.log("load Diabetes Prevalence data");
  var workbook = _xlsx2.default.readFile('dist/data_source/DM_PREV_ALL_STATES.xlsx');
  var fullDocument = _xlsx2.default.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });
  var disease = await _disease2.default.findOneOrCreate({ name: "Diabetes" });
  var years = fullDocument[0].slice(1).filter(function (cell) {
    return cell != "";
  });
  var row = 2;
  var column = 0;
  while (row < fullDocument.length) {
    var state = await _state2.default.findOneOrCreate({ name: fullDocument[row][column] });
    var county = await _county2.default.findOneOrCreate({
      fipsCode: fullDocument[row][column + 1],
      name: fullDocument[row][column + 2],
      stateId: state._id
    });
    column = column + 3;
    var year = 0;
    while (column < fullDocument[row].length) {
      var stats = new _statistic2.default({
        countyId: county._id,
        diseaseId: disease._id,
        statisticDate: new Date(years[year]),
        totalCount: fullDocument[row][column] != "No Data" ? fullDocument[row][column] : null,
        percent: fullDocument[row][column + 1] != "No Data" ? fullDocument[row][column + 1] : null,
        lowerConfidenceLimit: fullDocument[row][column + 2] != "No Data" ? fullDocument[row][column + 2] : null,
        upperConfidenceLimit: fullDocument[row][column + 3] != "No Data" ? fullDocument[row][column + 3] : null,
        ageAdjustedPercent: fullDocument[row][column + 4] != "No Data" ? fullDocument[row][column + 4] : null,
        ageLowerConfidenceLimit: fullDocument[row][column + 5] != "No Data" ? fullDocument[row][column + 5] : null,
        ageUpperConfidenceLimit: fullDocument[row][column + 6] != "No Data" ? fullDocument[row][column + 6] : null,
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
  console.log("load Diabetes Prevalence By Gender data");
  var workbook = _xlsx2.default.readFile('dist/data_source/DM_PREV_by_sex_ALL_STATES.xlsx');
  var fullDocument = _xlsx2.default.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });
  var disease = await _disease2.default.findOneOrCreate({ name: "Diabetes" });
  var years = fullDocument[0].slice(1).filter(function (cell) {
    return cell != "";
  });
  console.log(years);
  var row = 2;
  var column = 0;
  while (row < fullDocument.length) {
    var state = await _state2.default.findOneOrCreate({ name: fullDocument[row][column] });
    var county = await _county2.default.findOneOrCreate({
      fipsCode: fullDocument[row][column + 1],
      name: fullDocument[row][column + 2],
      stateId: state._id
    });
    column = column + 3;
    var year = 0;
    while (column < fullDocument[row].length) {
      var statsMale = new _statistic2.default({
        countyId: county._id,
        diseaseId: disease._id,
        statisticDate: new Date(years[year]),
        totalCount: fullDocument[row][column] != "No Data" ? fullDocument[row][column] : null,
        percent: fullDocument[row][column + 1] != "No Data" ? fullDocument[row][column + 1] : null,
        lowerConfidenceLimit: fullDocument[row][column + 2] != "No Data" ? fullDocument[row][column + 2] : null,
        upperConfidenceLimit: fullDocument[row][column + 3] != "No Data" ? fullDocument[row][column + 3] : null,
        ageAdjustedPercent: fullDocument[row][column + 4] != "No Data" ? fullDocument[row][column + 4] : null,
        ageLowerConfidenceLimit: fullDocument[row][column + 5] != "No Data" ? fullDocument[row][column + 5] : null,
        ageUpperConfidenceLimit: fullDocument[row][column + 6] != "No Data" ? fullDocument[row][column + 6] : null,
        genderScope: "M"
      });
      var statsFemale = new _statistic2.default({
        countyId: county._id,
        diseaseId: disease._id,
        statisticDate: new Date(years[year]),
        totalCount: fullDocument[row][column + 7] != "No Data" ? fullDocument[row][column + 7] : null,
        percent: fullDocument[row][column + 8] != "No Data" ? fullDocument[row][column + 8] : null,
        lowerConfidenceLimit: fullDocument[row][column + 9] != "No Data" ? fullDocument[row][column + 9] : null,
        upperConfidenceLimit: fullDocument[row][column + 10] != "No Data" ? fullDocument[row][column + 10] : null,
        ageAdjustedPercent: fullDocument[row][column + 11] != "No Data" ? fullDocument[row][column + 11] : null,
        ageLowerConfidenceLimit: fullDocument[row][column + 12] != "No Data" ? fullDocument[row][column + 12] : null,
        ageUpperConfidenceLimit: fullDocument[row][column + 13] != "No Data" ? fullDocument[row][column + 13] : null,
        genderScope: "F"
      });
      statsMale.save(function (err, result) {
        if (err) {
          console.log(err);
        }
      });
      statsFemale.save(function (err, result) {
        if (err) {
          console.log(err);
        }
      });
      column = column + 14;
      year++;
    }
    column = 0;
    row++;
  }
  return;
}