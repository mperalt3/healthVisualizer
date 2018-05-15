console.log('\n\nThis script populates the database. It may take a few minutes...');
import { databaseConfiguration } from '../config/db';
import async  from 'async';
import mongoose from 'mongoose';
import XLSX from 'xlsx';
import County from '../app/models/county';
import Disease from '../app/models/disease';
import State from '../app/models/state';
import Statistic from '../app/models/statistic';
import { loadGeneralData } from "./loadGeneralData";
import { loadByGenderData } from "./loadByGenderData";

// Open database conection
const mongoDB = 'mongodb://127.0.0.1/' + databaseConfiguration.name;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// This function clear all documents from the database collections
async function clearModels(){
  console.log("Removing existing data from...")
  await County.remove({}, (err, result)=>{
    if(err){ console.log(err) }
    console.log("...Counties");
  }).exec();
  await Disease.remove({}, (err, result)=>{
    if(err){ console.log(err) }
    console.log("...Diseases");
  }).exec();
  await State.remove({}, (err, result)=>{
    if(err){ console.log(err) }
    console.log("...States");
  }).exec();
  await Statistic.remove({}, (err, result)=>{
    if(err){ console.log(err) }
    console.log("...Statistics");
  }).exec();
  console.log("Data cleared!\n")
  return;
}

// This function call the loading functions in order to populate the database
async.series([
    clearModels,
    loadGeneralData.bind(this, "dist/data_source/DM_PREV_ALL_STATES.xlsx", "diabetes prevalence"),
    loadGeneralData.bind(this, "dist/data_source/OB_PREV_ALL_STATES.xlsx", "obesity prevalence"),
    loadGeneralData.bind(this, "dist/data_source/LTPIA_PREV_ALL_STATES.xlsx", "physical inactivity"),
    loadGeneralData.bind(this, "dist/data_source/INCIDENCE_ALL_STATES.xlsx", "diabetes incidence"),
    loadByGenderData.bind(this, "dist/data_source/DM_PREV_by_sex_ALL_STATES.xlsx", "diabetes prevalence"),
    loadByGenderData.bind(this, "dist/data_source/OB_PREV_by_sex_ALL_STATES.xlsx", "obesity prevalence"),
    loadByGenderData.bind(this, "dist/data_source/LTPIA_PREV_by_sex_ALL_STATES.xlsx", "physical inactivity")
],
(err, results) => {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Database loaded successfully!');
    }
    // mongoose.connection.close();
});
