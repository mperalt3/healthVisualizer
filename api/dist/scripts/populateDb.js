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

var _loadGeneralData = require('./loadGeneralData');

var _loadByGenderData = require('./loadByGenderData');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('\n\nThis script populates the database. It may take a few minutes...');


// Open database conection
var mongoDB = 'mongodb://127.0.0.1/' + _db.databaseConfiguration.name;
_mongoose2.default.connect(mongoDB);
_mongoose2.default.Promise = global.Promise;
var db = _mongoose2.default.connection;
_mongoose2.default.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// This function clear all documents from the database collections
async function clearModels() {
  console.log("Removing existing data from...");
  await _county2.default.remove({}, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log("...Counties");
  }).exec();
  await _disease2.default.remove({}, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log("...Diseases");
  }).exec();
  await _state2.default.remove({}, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log("...States");
  }).exec();
  await _statistic2.default.remove({}, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log("...Statistics");
  }).exec();
  console.log("Data cleared!\n");
  return;
}

// This function call the loading functions in order to populate the database
_async2.default.series([clearModels, _loadGeneralData.loadGeneralData.bind(undefined, "dist/data_source/DM_PREV_ALL_STATES.xlsx", "diabetes prevalence"), _loadGeneralData.loadGeneralData.bind(undefined, "dist/data_source/OB_PREV_ALL_STATES.xlsx", "obesity prevalence"), _loadGeneralData.loadGeneralData.bind(undefined, "dist/data_source/LTPIA_PREV_ALL_STATES.xlsx", "physical inactivity"), _loadGeneralData.loadGeneralData.bind(undefined, "dist/data_source/INCIDENCE_ALL_STATES.xlsx", "diabetes incidence"), _loadByGenderData.loadByGenderData.bind(undefined, "dist/data_source/DM_PREV_by_sex_ALL_STATES.xlsx", "diabetes"), _loadByGenderData.loadByGenderData.bind(undefined, "dist/data_source/OB_PREV_by_sex_ALL_STATES.xlsx", "obesity prevalence"), _loadByGenderData.loadByGenderData.bind(undefined, "dist/data_source/LTPIA_PREV_by_sex_ALL_STATES.xlsx", "physical inactivity")], function (err, results) {
  if (err) {
    console.log('FINAL ERR: ' + err);
  } else {
    console.log('Database loaded successfully!');
  }
  // mongoose.connection.close();
});