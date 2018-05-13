console.log('This script populates database');
import { databaseConfiguration } from '../config/db';
import async  from 'async';
import mongoose from 'mongoose';
import XLSX from 'xlsx';
import County from '../app/models/county';
import Disease from '../app/models/disease';
import State from '../app/models/state';
import Statistic from '../app/models/statistic';

// Open database conection
const mongoDB = 'mongodb://127.0.0.1/' + databaseConfiguration.name;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// This function clear all documents from the database collections
async function clearModels(){
  console.log("removing existing data from")
  await County.remove({}, (err, result)=>{
    if(err){ console.log(err) }
    console.log("Counties");
  }).exec();
  await Disease.remove({}, (err, result)=>{
    if(err){ console.log(err) }
    console.log("Diseases");
  }).exec();
  await State.remove({}, (err, result)=>{
    if(err){ console.log(err) }
    console.log("States");
  }).exec();
  await Statistic.remove({}, (err, result)=>{
    if(err){ console.log(err) }
    console.log("Statistics");
  }).exec();
  console.log("Data cleared!")
  return;
}

// This function load data from DM_PREV_ALL_STATES.xlsx file
async function loadDiabetesPrevalence(){
  console.log("load Diabetes Prevalence data");
  const workbook = XLSX.readFile('dist/data_source/DM_PREV_ALL_STATES.xlsx');
  const fullDocument = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });
  let disease = await Disease.findOneOrCreate({ name: "Diabetes" });
  let years = fullDocument[0].slice(1).filter(cell => cell != "");
  let row = 2;
  let column = 0;
  while(row < fullDocument.length){
    let state = await State.findOneOrCreate({ name: fullDocument[row][column] });
    let county = await County.findOneOrCreate({
      fipsCode: fullDocument[row][column+1],
      name: fullDocument[row][column+2],
      stateId: state._id
    });
    column = column+3;
    let year = 0;
    while(column < fullDocument[row].length){
      let stats = new Statistic({
        countyId:       county._id,
        diseaseId:      disease._id,
        statisticDate:  new Date(years[year]),
        totalCount:               fullDocument[row][column] != "No Data" ? fullDocument[row][column] : null,
        percent:                  fullDocument[row][column + 1] != "No Data" ? fullDocument[row][column + 1] : null,
        lowerConfidenceLimit:     fullDocument[row][column + 2] != "No Data" ? fullDocument[row][column + 2] : null,
        upperConfidenceLimit:     fullDocument[row][column + 3] != "No Data" ? fullDocument[row][column + 3] : null,
        ageAdjustedPercent:       fullDocument[row][column + 4] != "No Data" ? fullDocument[row][column + 4] : null,
        ageLowerConfidenceLimit:  fullDocument[row][column + 5] != "No Data" ? fullDocument[row][column + 5] : null,
        ageUpperConfidenceLimit:  fullDocument[row][column + 6] != "No Data" ? fullDocument[row][column + 6] : null,
        genderScope: "A"
      });
      stats.save((err, result)=>{
        if (err){ console.log(err) }
      })
      column = column + 7;
      year++;
    }
    column=0;
    row++;
  }
  return;
}


async function loadDiabetesPrevalenceByGender(){
  console.log("load Diabetes Prevalence By Gender data");
  const workbook = XLSX.readFile('dist/data_source/DM_PREV_by_sex_ALL_STATES.xlsx');
  const fullDocument = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });
  let disease = await Disease.findOneOrCreate({ name: "Diabetes" });
  let years = fullDocument[0].slice(1).filter(cell => cell != "");
  console.log(years)
  let row = 2;
  let column = 0;
  while(row < fullDocument.length){
    let state = await State.findOneOrCreate({ name: fullDocument[row][column] });
    let county = await County.findOneOrCreate({
      fipsCode: fullDocument[row][column+1],
      name:     fullDocument[row][column+2],
      stateId:  state._id
    });
    column = column + 3;
    let year = 0;
    while(column < fullDocument[row].length){
      let statsMale = new Statistic({
        countyId:       county._id,
        diseaseId:      disease._id,
        statisticDate:  new Date(years[year]),
        totalCount:               fullDocument[row][column] != "No Data" ? fullDocument[row][column] : null,
        percent:                  fullDocument[row][column + 1] != "No Data" ? fullDocument[row][column + 1] : null,
        lowerConfidenceLimit:     fullDocument[row][column + 2] != "No Data" ? fullDocument[row][column + 2] : null,
        upperConfidenceLimit:     fullDocument[row][column + 3] != "No Data" ? fullDocument[row][column + 3] : null,
        ageAdjustedPercent:       fullDocument[row][column + 4] != "No Data" ? fullDocument[row][column + 4] : null,
        ageLowerConfidenceLimit:  fullDocument[row][column + 5] != "No Data" ? fullDocument[row][column + 5] : null,
        ageUpperConfidenceLimit:  fullDocument[row][column + 6] != "No Data" ? fullDocument[row][column + 6] : null,
        genderScope: "M"
      });
      let statsFemale = new Statistic({
        countyId:       county._id,
        diseaseId:      disease._id,
        statisticDate:  new Date(years[year]),
        totalCount:               fullDocument[row][column + 7] != "No Data" ? fullDocument[row][column + 7] : null,
        percent:                  fullDocument[row][column + 8] != "No Data" ? fullDocument[row][column + 8] : null,
        lowerConfidenceLimit:     fullDocument[row][column + 9] != "No Data" ? fullDocument[row][column + 9] : null,
        upperConfidenceLimit:     fullDocument[row][column + 10] != "No Data" ? fullDocument[row][column + 10] : null,
        ageAdjustedPercent:       fullDocument[row][column + 11] != "No Data" ? fullDocument[row][column + 11] : null,
        ageLowerConfidenceLimit:  fullDocument[row][column + 12] != "No Data" ? fullDocument[row][column + 12] : null,
        ageUpperConfidenceLimit:  fullDocument[row][column + 13] != "No Data" ? fullDocument[row][column + 13] : null,
        genderScope: "F"
      });
      statsMale.save((err, result)=>{
        if (err){ console.log(err) }
      });
      statsFemale.save((err, result)=>{
        if (err){ console.log(err) }
      });
      column = column + 14;
      year++;
    }
    column=0;
    row++;
  }
  return;
}

// This function call the following functions in order to populate the database
async.series([
    clearModels,
    loadDiabetesPrevalence,
    loadDiabetesPrevalenceByGender
],
(err, results) => {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('loaded success');
    }
    // mongoose.connection.close();
});
