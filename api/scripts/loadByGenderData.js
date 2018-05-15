import async  from 'async';
import XLSX from 'xlsx';
import County from '../app/models/county';
import Disease from '../app/models/disease';
import State from '../app/models/state';
import Statistic from '../app/models/statistic';

// This function load data from excel with data from female and male.
// params:
// string filename: Relative path of the file.
// string name: Name of the disease
export async function loadByGenderData(filename, name){
  console.log("Loading " + name + " by gender...");
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
    column = column + 3;
    let year = 0;
    while(column < fullDocument[row].length){
      let statsMale = new Statistic({
        countyId:                 county._id,
        diseaseId:                disease._id,
        statisticDate:            new Date(years[year]),
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
        countyId:                 county._id,
        diseaseId:                disease._id,
        statisticDate:            new Date(years[year]),
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
  console.log("Loading " + name + " by gender complete!");
  return;
}
