console.log('This script populates database');
import { databaseConfiguration } from '../config/db';
import async  from 'async';
import mongoose from 'mongoose';
import XLSX from 'xlsx';
import County from '../app/models/county';
import Disease from '../app/models/disease';
import State from '../app/models/state';
import Statistic from '../app/models/statistic';

const mongoDB = 'mongodb://127.0.0.1/' + databaseConfiguration.name;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

let diseases = [];
let states = [];

async function clearModels(){
  console.log("removing existing data")
  await County.remove({}, (err, result)=>{
    if(err){ console.log(err) }
    console.log(result);
  }).exec();
  await Disease.remove({}, (err, result)=>{
    if(err){ console.log(err) }
    console.log(result);
  }).exec();
  await State.remove({}, (err, result)=>{
    if(err){ console.log(err) }
    console.log(result);
  }).exec();
  await Statistic.remove({}, (err, result)=>{
    if(err){ console.log(err) }
    console.log(result);
  }).exec();
  console.log("cleared!")
  return;
}

function returnResult(err, result){
  if (err){ console.log("error"+err) }
  console.log("resultado:"+result)
  return result;
}

async function loadDiabetesPrevalence(){
  console.log("loadDiabetesPrevalence");
  const workbook = XLSX.readFile('dist/data_source/DM_PREV_ALL_STATES.xlsx');
  const fullDocument = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {header:1});
  let disease = await Disease.findOneOrCreate({ name: "Obesity" });
  let years = fullDocument[0].slice(1).filter(cell => cell != "");
  let row = 2;
  let column = 0;
  while(row < fullDocument.length){
    let state = await State.findOneOrCreate({name: fullDocument[row][column]}, returnResult);
    let county = await County.findOneOrCreate({
      fipsCode: fullDocument[row][column+1],
      name: fullDocument[row][column+2],
      stateId: state._id
    }, returnResult);
    column = column+3;
    let year = 0;
    while(column < fullDocument[row].length){
      let stats = new Statistic({
        countyId: county._id,
        diseaseId: disease._id,
        statisticDate: new Date(years[year]),
        totalCount: fullDocument[row][column],
        percent: fullDocument[row][column+1],
        lowerConfidenceLimit: fullDocument[row][column+2],
        upperConfidenceLimit: fullDocument[row][column+3],
        ageAdjustedPercent: fullDocument[row][column+4],
        ageLowerConfidenceLimit: fullDocument[row][column+5],
        ageUpperConfidenceLimit: fullDocument[row][column+6],
        genderScope: "A"
      });
      stats.save((err, result)=>{
        if (err){ console.log(err) }
      })
      column = column +7;
      year++;
    }
    column=0;
    row++;
  }
  return;
}


async function loadDiabetesPrevalenceByGender(){
  console.log("loadDiabetesPrevalenceByGender")
  let state = await new State({name: "Florida"});
  await state.save(function (err) {
    if (err) {
      console.log('ERROR CREATING state ' + state);
      console.log(err)
      return
    }
    console.log('New state: ' + state);
  });
  states.push(state);
  return;
}

async.series([
    clearModels,
    loadDiabetesPrevalence,
    // loadDiabetesPrevalenceByGender
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
