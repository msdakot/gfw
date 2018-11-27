import { createSelector, createStructuredSelector } from 'reselect';
import findIndex from 'lodash/findIndex';
import sumBy from 'lodash/sumBy';
import { format } from 'd3-format';

const getData = state => state.data || null;
const getLocation = state => state.allLocation || null;
const getLocationName = state => state.locationName || null;
const getColors = state => state.colors || null;
const getSettings = state => state.settings || null;
const getPeriod = state => state.settings.period || null;
const getSentences = state => state.config && state.config.sentences;
const getTitle = state => state.config.title;
const getLocationType = state => state.locationType || null;

export const parseData = createSelector(
  [getData, getLocation, getColors],
  (data, location, colors) => {
    if (!data || !data.rank) return null;
    const { rank } = data;
    let dataTrimmed = rank;
    if (location.country) {
      const locationIndex = findIndex(rank, d => d.iso === location.country);
      let trimStart = locationIndex - 2;
      let trimEnd = locationIndex + 3;
      if (locationIndex < 2) {
        trimStart = 0;
        trimEnd = 5;
      }
      if (locationIndex > rank.length - 3) {
        trimStart = rank.length - 5;
        trimEnd = rank.length;
      }
      dataTrimmed = rank.slice(trimStart, trimEnd);
    }
    const { query, type } = location;

    return dataTrimmed.map(d => ({
      ...d,
      label: d.name,
      color: colors.main,
      path: {
        type,
        payload: { adm0: d.iso },
        query
      },
      value: d.deforest
    }));
  }
);

export const parseSentence = createSelector(
  [getData, getLocationName, getSettings, getPeriod, getSentences],
  (data, currentLabel, settings, period, sentences) => {
    if (!data || !data.fao) return '';
    const {
      initial,
      noDeforest,
      humanDeforest,
      globalInitial,
      globalHuman
    } = sentences;
    const topFao = data.fao.filter(d => d.year === settings.period);
    const { deforest, humdef } = topFao[0] || {};
    const totalDeforest = sumBy(data.rank, 'deforest');
    const rate = currentLabel === 'global' ? totalDeforest : deforest;

    let sentence = humdef ? humanDeforest : initial;
    if (currentLabel === 'global') {
      sentence = humdef ? globalHuman : globalInitial;
    } else if (!deforest) sentence = noDeforest;

    const rateFormat = rate < 1 ? '.3r' : '.3s';
    const humanFormat = humdef < 1 ? '.3r' : '.3s';

    const params = {
      location: currentLabel,
      year: period,
      rate: `${format(rateFormat)(rate)}ha/yr`,
      human: `${format(humanFormat)(humdef)}ha/yr`
    };

    return {
      sentence,
      params
    };
  }
);

export const parseTitle = createSelector(
  [getTitle, getLocationType],
  (title, type) => {
    let selectedTitle = title.initial;
    if (type === 'global') {
      selectedTitle = title.global;
    }
    return selectedTitle;
  }
);

export default createStructuredSelector({
  data: parseData,
  sentence: parseSentence,
  title: parseTitle
});
