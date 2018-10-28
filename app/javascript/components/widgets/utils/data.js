import groupBy from 'lodash/groupBy';
import mean from 'lodash/mean';
import meanBy from 'lodash/meanBy';
import concat from 'lodash/concat';
import maxBy from 'lodash/maxBy';
import minBy from 'lodash/minBy';
import upperCase from 'lodash/upperCase';
import moment from 'moment';

const translateMeans = (means, latest) => {
  if (!means || !means.length) return null;
  const currentWeek = moment(latest).isoWeek();
  const firstHalf = means.slice(0, currentWeek);
  const secondHalf = means.slice(currentWeek);

  return secondHalf.concat(firstHalf);
};

const getYearsObj = (data, startSlice, endSlice) => {
  const grouped = groupBy(data, 'year');
  return Object.keys(grouped).map(key => ({
    year: key,
    weeks: grouped[key].slice(
      startSlice < 0 ? grouped[key].length + startSlice : startSlice,
      endSlice < 0 ? grouped[key].length : endSlice
    )
  }));
};

const meanData = data => {
  const means = [];
  data.forEach(w => {
    w.weeks.forEach((y, i) => {
      means[i] = means[i] ? [...means[i], y.count] : [y.count];
    });
  });
  return means.map(w => mean(w));
};

const runningMean = (data, windowSize) => {
  const smoothedMean = [];
  data.forEach((d, i) => {
    const slice = data.slice(i, i + windowSize);
    if (i < data.length - windowSize + 1) {
      smoothedMean.push(mean(slice));
    }
  });
  return smoothedMean;
};

export const getMeansData = (data, latest) => {
  const minYear = minBy(data, 'year').year;
  const maxYear = maxBy(data, 'year').year;
  const grouped = groupBy(data, 'week');
  const centralMeans = Object.keys(grouped).map(d => {
    const weekData = grouped[d];
    return meanBy(weekData, 'count');
  });
  const leftYears = data.filter(d => d.year !== maxYear);
  const rightYears = data.filter(d => d.year !== minYear);
  const leftMeans = meanData(getYearsObj(leftYears, -6));
  const rightMeans = meanData(getYearsObj(rightYears, 0, 6));
  const allMeans = concat(leftMeans, centralMeans, rightMeans);
  const smoothedMeans = runningMean(allMeans, 12);
  const translatedMeans = translateMeans(smoothedMeans, latest);
  const pastYear = data.slice(-52);
  const parsedData = pastYear.map((d, i) => ({
    ...d,
    mean: translatedMeans[i]
  }));
  return parsedData;
};

export const getStdDevData = (data, rawData) => {
  const stdDevs = [];
  const centralMeans = data.map(d => d.mean);
  const groupedByYear = groupBy(rawData, 'year');
  const meansFromGroup = Object.keys(groupedByYear).map(key =>
    groupedByYear[key].map(d => d.count)
  );
  for (let i = 0; i < centralMeans.length; i += 1) {
    meansFromGroup.forEach(m => {
      const value = m[i] || 0;
      const some =
        value && centralMeans[i] ? (centralMeans[i] - value) ** 2 : null;
      stdDevs[i] = stdDevs[i] ? [...stdDevs[i], some] : [some];
    });
  }
  const stdDev = mean(stdDevs.map(s => mean(s) ** 0.5));

  return data.map(d => ({
    ...d,
    plusStdDev: [d.mean, d.mean + stdDev],
    minusStdDev: [d.mean - stdDev, d.mean],
    twoPlusStdDev: [d.mean + stdDev, d.mean + stdDev * 2],
    twoMinusStdDev: [d.mean - stdDev * 2, d.mean - stdDev]
  }));
};

export const getDatesData = data =>
  data.map(d => ({
    ...d,
    date: moment()
      .year(d.year)
      .week(d.week)
      .format('YYYY-MM-DD'),
    month: upperCase(
      moment()
        .year(d.year)
        .week(d.week)
        .format('MMM')
    )
  }));
export const getChartConfig = (colors, latest) => {
  const ticks = [];
  while (ticks.length < 12) {
    ticks.push(
      parseInt(
        moment(latest)
          .subtract(ticks.length, 'months')
          .format('Mo'),
        10
      )
    );
  }
  return {
    xKey: 'date',
    yKeys: {
      lines: {
        count: {
          stroke: colors.main
        }
      },
      areas: {
        plusStdDev: {
          fill: '#555555',
          stroke: '#555555',
          opacity: 0.1,
          strokeWidth: 0,
          background: false,
          activeDot: false
        },
        minusStdDev: {
          fill: '#555555',
          stroke: '#555555',
          opacity: 0.1,
          strokeWidth: 0,
          background: false,
          activeDot: false
        },
        twoPlusStdDev: {
          fill: '#555555',
          stroke: '#555555',
          opacity: 0.2,
          strokeWidth: 0,
          background: false,
          activeDot: false
        },
        twoMinusStdDev: {
          fill: '#555555',
          stroke: '#555555',
          opacity: 0.2,
          strokeWidth: 0,
          background: false,
          activeDot: false
        }
      }
    },
    xAxis: {
      tickCount: 12,
      interval: 4,
      tickFormatter: t => moment(t).format('MMM')
    },
    yAxis: {
      domain: [0, 'auto'],
      allowDataOverflow: true
    },
    height: '280px'
  };
};
