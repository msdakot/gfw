import { createElement, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { track } from 'utils/analytics';

import * as ownActions from 'components/map-v2/actions';
import * as popupActions from 'components/map-v2/components/popup/actions';
import { getMapProps } from './selectors';
import MapComponent from './component';

const actions = {
  ...popupActions,
  ...ownActions
};

class MapContainer extends PureComponent {
  static propTypes = {
    basemap: PropTypes.object,
    mapOptions: PropTypes.object,
    setLandsatBasemap: PropTypes.func
  };

  state = {
    bbox: null
  };

  componentDidUpdate(prevProps) {
    const {
      basemap,
      mapOptions: { zoom },
      canBound,
      bbox,
      geostoreBbox,
      layerBbox,
      setMapSettings,
      setLandsatBasemap
    } = this.props;

    // update landsat basemap when changing zoom
    if (basemap.id === 'landsat' && zoom !== prevProps.zoom) {
      setLandsatBasemap({
        year: basemap.year,
        defaultUrl: basemap.defaultUrl
      });
    }

    // only set bounding box if action allows it
    if (canBound && bbox !== prevProps.bbox) {
      this.setBbox(bbox);
    }

    // if a new layer contains a bbox
    if (layerBbox && layerBbox !== prevProps.layerBbox) {
      setMapSettings({ bbox: layerBbox });
    }

    // if geostore changes
    if (geostoreBbox && geostoreBbox !== prevProps.geostoreBbox) {
      setMapSettings({ bbox: geostoreBbox });
    }
  }

  setBbox = bbox => {
    this.setState({ bbox });
  };

  handleMapMove = (e, map) => {
    const { setMapSettings } = this.props;
    setMapSettings({
      zoom: map.getZoom(),
      center: map.getCenter(),
      canBound: false,
      bbox: null
    });
    this.setBbox(null);
  };

  handleMapInteraction = ({ e, article, output, layer }) => {
    const { setInteraction, draw, menuSection } = this.props;

    if (!draw && !menuSection) {
      setInteraction({
        ...e,
        label: layer.name,
        article,
        isBoundary: layer.isBoundary,
        id: layer.id,
        value: layer.id,
        config: output
      });
      track('mapInteraction', {
        label: layer.name
      });
    }
  };

  render() {
    return createElement(MapComponent, {
      ...this.props,
      ...this.state,
      handleMapInteraction: this.handleMapInteraction,
      handleMapMove: this.handleMapMove,
      setBbox: this.setBbox
    });
  }
}

MapContainer.propTypes = {
  canBound: PropTypes.bool,
  bbox: PropTypes.array,
  geostoreBbox: PropTypes.array,
  setMapSettings: PropTypes.func,
  layerBbox: PropTypes.array,
  draw: PropTypes.bool,
  setInteraction: PropTypes.func,
  menuSection: PropTypes.string,
  activeDatasets: PropTypes.array
};

export default connect(getMapProps, actions)(MapContainer);
