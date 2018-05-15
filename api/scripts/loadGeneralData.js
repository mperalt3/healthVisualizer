import async from 'async';
import XLSX from 'xlsx';
import County from '../app/models/county';
import Disease from '../app/models/disease';
import State from '../app/models/state';
import Statistic from '../app/models/statistic';

// This function load data from excel with the general data estructure
// params:
// string filename: Relative path of the file
// string name: Name of the disease
export async function loadGeneralData(filename, name){
  console.log("Loading " + name + " data...");
  const workbook = XLSX.readFile(filename);
  const fullDocument = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });
  let disease = await Disease.findOneOrCreate({ name: name });
  let years = fullDocument[0].slice(1).filter(cell => cell != "");
  let row = 2;
  let column = 0;
  while(row < fullDocument.length){
    let state = await State.findOneOrCreate({ name: fullDocument[row][column] });
    let county = await County.findOneOrCreate({
      fipsCode: fullDocument[row][column+1],
      name:     fullDocument[row][column+2],
      stateId:  state._id
    });
    column = column+3;
    let year = 0;
    while(column < fullDocument[row].length){
      let statsParams = {
        countyId:                 county._id,
        diseaseId:                disease._id,
        statisticDate:            new Date(years[year]),
        lowerConfidenceLimit:     fullDocument[row][column + 2] != "No Data" ? fullDocument[row][column + 2] : null,
        upperConfidenceLimit:     fullDocument[row][column + 3] != "No Data" ? fullDocument[row][column + 3] : null,
        ageAdjustedPercent:       fullDocument[row][column + 4] != "No Data" ? fullDocument[row][column + 4] : null,
        ageLowerConfidenceLimit:  fullDocument[row][column + 5] != "No Data" ? fullDocument[row][column + 5] : null,
        ageUpperConfidenceLimit:  fullDocument[row][column + 6] != "No Data" ? fullDocument[row][column + 6] : null,
        genderScope: "A"
      }
      if (name == "diabetes incidence"){
        statsParams.newCases    = fullDocument[row][column] != "No Data" ? fullDocument[row][column] : null;
        statsParams.ratePer1000 = fullDocument[row][column + 1] != "No Data" ? fullDocument[row][column + 1] : null;
      } else {
        statsParams.totalCount  = fullDocument[row][column] != "No Data" ? fullDocument[row][column] : null;
        statsParams.percent     = fullDocument[row][column + 1] != "No Data" ? fullDocument[row][column + 1] : null;
      }
      let stats = new Statistic( statsParams );
      stats.save((err, result)=>{
        if (err){ console.log(err) }
      })
      column = column + 7;
      year++;
    }
    column=0;
    row++;
  }
  console.log("Loading " + name + " complete!");
  return;
}
