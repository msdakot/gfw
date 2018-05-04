import { connect } from 'react-redux';
import replace from 'lodash/replace';

import CATEGORIES from 'data/categories.json';

import mapActions from 'components/map/map-actions';

import { filterWidgets, getActiveWidget } from 'components/widgets/selectors';
import { getLinks, getAdminsSelected } from './page-selectors';
import Component from './page-component';

const actions = { ...mapActions };

const mapStateToProps = ({ countryData, whitelists, location, map }) => {
  const category = (location.query && location.query.category) || 'summary';
  const {
    countryWhitelistLoading,
    regionWhitelistLoading,
    regionWhitelist,
    countryWhitelist
  } = whitelists;
  const adminData = {
    ...countryData,
    ...location
  };
  const locationNames = getAdminsSelected(adminData);
  const locationOptions = { ...countryData };
  const widgetHash =
    window.location.hash && replace(window.location.hash, '#', '');
  const widgetAnchor = document.getElementById(widgetHash);
  const widgetData = {
    category,
    ...location,
    countryData,
    activeWidget:
      replace(window.location.hash, '#', '') ||
      (location.query && location.query.widget),
    indicatorWhitelist: location.payload.region
      ? regionWhitelist
      : countryWhitelist
  };

  return {
    showMapMobile: map.showMapMobile,
    links: getLinks({ categories: CATEGORIES, ...location, category }),
    isGeostoreLoading: countryData.isGeostoreLoading,
    category,
    widgets: filterWidgets(widgetData),
    activeWidget: getActiveWidget(widgetData),
    ...location,
    widgetAnchor,
    ...countryData,
    locationNames,
    locationOptions,
    currentLocation:
      locationNames && locationNames.current && locationNames.current.label,
    locationGeoJson: countryData.geostore && countryData.geostore.geojson,
    loading: countryWhitelistLoading || regionWhitelistLoading
  };
};

export default connect(mapStateToProps, actions)(Component);