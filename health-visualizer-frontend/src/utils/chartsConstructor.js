// Module to construct data for charts froms any disease statistics
import { colorSerieA, colorSerieF, colorSerieM } from "../constants/seriesColors"

// Take an array of statistics and construct the data elements for charts
export const generateCharts = (diseaseStats) => {
  let years = [];
  let serieArray = ["A", "M", "F"];
  let series = {
    "A": {
      totalCount: [],
      percent: [],
      sum: 0,
      count: 0
    },
    "M": {
      totalCount: [],
      percent: [],
      sum: 0,
      count: 0
    },
    "F": {
      totalCount: [],
      percent: [],
      sum: 0,
      count: 0
    }
  }

  // Fill years array with all years from statistics to generate charts xAxis
  diseaseStats.forEach(function(stat){
    let year = (new Date(stat.statisticDate)).getUTCFullYear();
    if (years.findIndex((element) => element === year) === -1) {
      years.push(year);
    }
  });

  // For each year in xAxis generate two different series, totalCount and percent
  years.forEach(function(year){
    serieArray.forEach(function (serie){
      let stat = diseaseStats.find(element => (new Date(element.statisticDate)).getUTCFullYear() === year && element.genderScope === serie );
      if (stat){
        series[serie].totalCount.push(stat.totalCount ? stat.totalCount : stat.newCases);
        series[serie].sum += stat.totalCount ? stat.totalCount : stat.newCases;
        series[serie].count += 1;
        series[serie].percent.push(stat.percent ? stat.percent : stat.ratePer1000);
      }else{
        series[serie].totalCount.push(0);
        series[serie].percent.push(0);
      }
    })
  });

  // Calculate average from totalCount serie
  let averageA = (series.A.sum / series.A.count)
  let averageM = (series.M.sum / series.M.count)
  let averageF = (series.F.sum / series.F.count)
  let percentM = 100*(averageM /(averageM+averageF))
  let percentF = 100*(averageF /(averageM+averageF))

  // Generate the config object for the differet charts and data needed
  let totalCountChart = {
    chart:{
      type: 'column'
    },
    xAxis: {
      categories: years
    },
    series: [{
      type: 'column',
      data: series.A.totalCount,
      name: 'All',
      color: colorSerieA
    }, {
      type: 'column',
      data: series.M.totalCount,
      name: 'Male',
      color: colorSerieM
    },{
      type: 'column',
      data: series.F.totalCount,
      name: 'Female',
      color: colorSerieF
    }],
    title: {text: ''}
  }

  let percentChart = {
    xAxis: {
      categories: years
    },
    series: [{
      data: series.A.percent,
      name: 'All',
      color: colorSerieA
    }, {
      data: series.M.percent,
      name: 'Male',
      color: colorSerieM
    },{
      data: series.F.percent,
      name: 'Female',
      color: colorSerieF
    }],
    title: {text: ''}
  }

  let averagePercentChart = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    series: [{
      data: [ {
          name: 'Male',
          color: colorSerieM,
          y: percentM,
          z: 2
        }, {
          name: 'Female',
          color: colorSerieF,
          y: percentF,
          z: 1
        }]
    }],
    title: {text: ''}
  };

  return {
    totalCountChart: totalCountChart,
    percentChart: percentChart,
    averagePercentChart: averagePercentChart,
    averageA: averageA,
    averageM: averageM,
    averageF: averageF
  };
}
