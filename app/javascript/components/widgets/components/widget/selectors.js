import {
  defaultMemoize,
  createSelectorCreator,
  createStructuredSelector
} from 'reselect';
import { pluralise } from 'utils/strings';
import { flattenObj } from 'utils/data';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import uniq from 'lodash/uniq';
import sortBy from 'lodash/sortBy';

// create a "selector creator" that uses lodash.isEqual instead of ===
const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

export const selectAllPropsAndState = (state, ownProps) => ownProps;
export const selectWidgetSettings = (state, { settings }) => settings;
export const selectWidgetConfig = (state, { config }) => config;
export const selectWidgetOptions = (state, { options }) => options;
export const selectWidgetUrlState = (state, { widget }) =>
  state.location && state.location.query && state.location.query[widget];
export const selectWidgetFromState = (state, { widget }) =>
  state.widgets.widgets[widget];
export const selectWidgetActive = (state, { activeWidget, widget }) =>
  activeWidget === widget;
export const selectWidgetActiveData = (state, { widget }) =>
  state.widgets.settings[widget];

export const getWidgetStateData = createDeepEqualSelector(
  [selectWidgetFromState],
  state => state && state.data
);

export const getWidgetSettings = createDeepEqualSelector(
  [selectWidgetUrlState, selectWidgetSettings, selectWidgetActiveData],
  (urlState, settings, activeData) => ({
    ...settings,
    ...urlState,
    activeData
  })
);

export const getWidgetPropsFromState = createDeepEqualSelector(
  [selectWidgetFromState, selectAllPropsAndState, getWidgetSettings],
  (widgetState, widgetProps, settings) => ({
    ...widgetProps.getProps({
      ...widgetState,
      ...widgetProps,
      settings
    })
  })
);

export const getWidgetOptions = createDeepEqualSelector(
  [selectWidgetOptions, getWidgetPropsFromState],
  (options, dataProps) => ({
    ...options,
    ...dataProps.options
  })
);

export const makeGetWidgetError = () =>
  createDeepEqualSelector(
    [selectWidgetFromState],
    props => props && props.error
  );

export const makeGetWidgetLoading = () =>
  createDeepEqualSelector(
    [selectWidgetFromState],
    props => props && props.loading
  );

export const makeGetWidgetTitle = () =>
  createDeepEqualSelector(
    [getWidgetPropsFromState],
    props => props && props.title
  );

export const makeGetWidgetSentence = () =>
  createDeepEqualSelector(
    [getWidgetPropsFromState],
    props => props && props.sentence
  );

export const makeGetWidgetData = () =>
  createDeepEqualSelector(
    [getWidgetPropsFromState],
    props => props && props.data
  );

export const makeGetWidgetDataConfig = () =>
  createDeepEqualSelector(
    [getWidgetPropsFromState],
    props => props && props.dataConfig
  );

export const getRangeYears = createDeepEqualSelector(
  [getWidgetStateData, selectWidgetConfig],
  (data, config) => {
    const { startYears, endYears, yearsRange } = config.options || {};
    if (!startYears || !endYears || isEmpty(data)) return null;
    const flatData = flattenObj(data);
    let years = [];
    Object.keys(flatData).forEach(key => {
      if (key.includes('year')) {
        years = years.concat(flatData[key]);
      }
    });
    years = uniq(years);
    years = yearsRange
      ? years.filter(y => y >= yearsRange[0] && y <= yearsRange[1])
      : years;

    return sortBy(
      years.map(y => ({
        label: y,
        value: y
      })),
      'value'
    );
  }
);

export const getOptionsWithYears = createDeepEqualSelector(
  [getWidgetOptions, getRangeYears, getWidgetSettings],
  (options, years, settings) => {
    if (!years || !years.length) return options;
    const { startYear, endYear } = settings;
    return {
      ...options,
      startYears: years.filter(y => y.value <= endYear),
      endYears: years.filter(y => y.value >= startYear)
    };
  }
);

export const getOptionsSelected = createDeepEqualSelector(
  [getWidgetSettings, getOptionsWithYears],
  (settings, options) => {
    if (!options || !settings) return null;
    return {
      ...Object.keys(settings).reduce((obj, settingsKey) => {
        const optionsKey = pluralise(settingsKey);
        const hasOptions = options[optionsKey];
        return {
          ...obj,
          ...(hasOptions &&
            hasOptions.length && {
              [settingsKey]: hasOptions.find(
                o => o.value === settings[settingsKey]
              )
            })
        };
      }, {})
    };
  }
);

export const getForestType = createDeepEqualSelector(
  [getOptionsSelected],
  selected => selected && selected.forestType
);

export const getLandCategory = createDeepEqualSelector(
  [getOptionsSelected],
  selected => selected && selected.landCategory
);

export const makeGetIndicator = () =>
  createDeepEqualSelector(
    [getForestType, getLandCategory],
    (forestType, landCategory) => {
      if (!forestType && !landCategory) return null;
      let label = '';
      let value = '';
      if (forestType && landCategory) {
        label = `${forestType.label} in ${landCategory.label}`;
        value = `${forestType.value}__${landCategory.value}`;
      } else if (landCategory) {
        label = landCategory.label;
        value = landCategory.value;
      } else {
        label = forestType.label;
        value = forestType.value;
      }

      return {
        label,
        value
      };
    }
  );

// caching selectors
export const makeGetWidgetSettings = () =>
  createDeepEqualSelector([getWidgetSettings], data => data);

export const makeGetOptionsSelected = () =>
  createDeepEqualSelector([getOptionsSelected], data => data);

export const makeGetForestType = () =>
  createDeepEqualSelector([getForestType], data => data);

export const makeGetLandCategory = () =>
  createDeepEqualSelector([getLandCategory], data => data);

export const makeGetOptionsWithYears = () =>
  createDeepEqualSelector([getOptionsWithYears], data => data);

export const makeSelectWidgetActive = () =>
  createDeepEqualSelector([selectWidgetActive], data => data);

export const makeGetWidgetProps = () => {
  const getWidgetLoading = makeGetWidgetLoading();
  const getWidgetError = makeGetWidgetError();
  const getWidgetTitle = makeGetWidgetTitle();
  const getWidgetSentence = makeGetWidgetSentence();
  const getWidgetData = makeGetWidgetData();
  const getWidgetDataConfig = makeGetWidgetDataConfig();
  const getIndicator = makeGetIndicator();

  // cached
  const getWidgetSettingsCached = makeGetWidgetSettings();
  const getOptionsSelectedCached = makeGetOptionsSelected();
  const getForestTypeCached = makeGetForestType();
  const getLandCategoryCached = makeGetLandCategory();
  const getOptionsWithYearsCached = makeGetOptionsWithYears();
  const selectWidgetActiveCached = makeSelectWidgetActive();

  return (state, props) => ({
    loading: getWidgetLoading(state, props),
    error: getWidgetError(state, props),
    title: getWidgetTitle(state, props),
    sentence: getWidgetSentence(state, props),
    indicator: getIndicator(state, props),
    data: getWidgetData(state, props),
    dataConfig: getWidgetDataConfig(state, props),
    // cached
    settings: getWidgetSettingsCached(state, props),
    optionsSelected: getOptionsSelectedCached(state, props),
    forestTypes: getForestTypeCached(state, props),
    landCategory: getLandCategoryCached(state, props),
    options: getOptionsWithYearsCached(state, props),
    active: selectWidgetActiveCached(state, props)
  });
};

// export const makeGetWidgetProps = () =>
//   createStructuredSelector({
//     loading: getWidgetLoading,
//     error: getWidgetError,
//     title: getWidgetTitle,
//     sentence: getWidgetSentence,
//     data: getWidgetData,
//     dataConfig: getWidgetDataConfig,
//     settings: getWidgetSettings,
//     optionsSelected: getOptionsSelected,
//     forestTypes: getForestType,
//     landCategory: getLandCategory,
//     indicator: getIndicator,
//     options: getOptionsWithYears,
//     active: selectWidgetActive
//   });
