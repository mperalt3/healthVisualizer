console.log('This script populates database');
import { databaseConfiguration } from '../config/db';
import async  from 'async';
import mongoose from 'mongoose';
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

async function loadDiabetesPrevalence(){
  console.log("loadDiabetesPrevalence")
  let disease = await new Disease({name: "Obesity"});
  await disease.save(function (err) {
    if (err) {
      console.log('ERROR CREATING disease ' + disease);
      return
    }
    console.log('New disease: ' + disease);
  });
  diseases.push(disease);
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
    // clearModels,
    loadDiabetesPrevalence,
    loadDiabetesPrevalenceByGender
],
(err, results) => {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('loaded success');
        console.log(diseases);
        console.log(states);
    }
    // mongoose.connection.close();
});
