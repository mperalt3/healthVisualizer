'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadIncidencesData = loadIncidencesData;

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

// This function load data from excel with the general data estructure.
// params:
// string filename: Relative path of the file.
// string name: Name of the disease
async function loadIncidencesData(filename, name) {
  console.log("Loading " + name + " data...");
  var workbook = _xlsx2.default.readFile(filename);
  var fullDocument = _xlsx2.default.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });
  var disease = await _disease2.default.findOneOrCreate({ name: name });
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
      var statsParams = {
        countyId: county._id,
        diseaseId: disease._id,
        statisticDate: new Date(years[year]),
        lowerConfidenceLimit: fullDocument[row][column + 2] != "No Data" ? fullDocument[row][column + 2] : null,
        upperConfidenceLimit: fullDocument[row][column + 3] != "No Data" ? fullDocument[row][column + 3] : null,
        ageAdjustedPercent: fullDocument[row][column + 4] != "No Data" ? fullDocument[row][column + 4] : null,
        ageLowerConfidenceLimit: fullDocument[row][column + 5] != "No Data" ? fullDocument[row][column + 5] : null,
        ageUpperConfidenceLimit: fullDocument[row][column + 6] != "No Data" ? fullDocument[row][column + 6] : null,
        genderScope: "A"
      };
      if (name == "diabetes incidence") {
        statsParams.newCases = fullDocument[row][column] != "No Data" ? fullDocument[row][column] : null;
        statsParams.ratePer1000 = fullDocument[row][column + 1] != "No Data" ? fullDocument[row][column + 1] : null;
      } else {
        statsParams.totalCount = fullDocument[row][column] != "No Data" ? fullDocument[row][column] : null;
        statsParams.percent = fullDocument[row][column + 1] != "No Data" ? fullDocument[row][column + 1] : null;
      }
      var stats = new _statistic2.default(statsParams);
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
  console.log("Loading " + name + " complete!");
  return;
}