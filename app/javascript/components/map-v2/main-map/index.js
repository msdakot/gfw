import { createElement, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import { format } from 'd3-format';
import startCase from 'lodash/startCase';
import flatMap from 'lodash/flatMap';
import { track } from 'utils/analytics';

import { setRecentImagerySettings } from 'components/map-v2/components/recent-imagery/recent-imagery-actions';
import MapComponent from './component';
import { getMapProps } from '../selectors';


const actions = {
  setRecentImagerySettings
};

class MapContainer extends PureComponent {
  state = {
    showTooltip: false,
    tooltipData: {}
  };

  componentDidMount() {
    const { activeDatasets } = this.props;
    const layerIds = flatMap(activeDatasets.map(d => d.layers));
    track('mapInitialLayers', {
      label: layerIds && layerIds.join(', ')
    });
  }

  componentDidUpdate(prevProps) {
    const {
      selectedInteraction,
      setAnalysisView,
      oneClickAnalysisActive
    } = this.props;

    // set analysis view if interaction changes
    if (
      oneClickAnalysisActive &&
      selectedInteraction &&
      !isEmpty(selectedInteraction.data) &&
      !isEqual(selectedInteraction, prevProps.selectedInteraction)
    ) {
      setAnalysisView(selectedInteraction);
    }
  }

  handleShowTooltip = (show, data) => {
    this.setState({ showTooltip: show, tooltipData: data });
  };

  handleRecentImageryTooltip = e => {
    const data = e.layer.feature.properties;
    const { cloudScore, instrument, dateTime } = data;
    this.handleShowTooltip(true, {
      instrument: startCase(instrument),
      date: moment(dateTime)
        .format('DD MMM YYYY, HH:mm')
        .toUpperCase(),
      cloudCoverage: `${format('.0f')(cloudScore)}%`
    });
  };

  render() {
    return createElement(MapComponent, {
      ...this.props,
      ...this.state,
      handleShowTooltip: this.handleShowTooltip,
      handleRecentImageryTooltip: this.handleRecentImageryTooltip
    });
  }
}

MapContainer.propTypes = {
  oneClickAnalysisActive: PropTypes.bool,
  setAnalysisView: PropTypes.func,
  selectedInteraction: PropTypes.object
};

export default connect(getMapProps, actions)(MapContainer);
