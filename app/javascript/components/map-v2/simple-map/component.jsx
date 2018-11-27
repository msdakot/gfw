import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Map from 'wri-api-components/dist/map';
import Loader from 'components/ui/loader';
import NoContent from 'components/ui/no-content';
import Icon from 'components/ui/icon';
import iconCrosshair from 'assets/icons/crosshair.svg';

import Popup from 'components/map-v2/components/popup';
import MapDraw from 'components/map-v2/components/draw';
import MapAttributions from 'components/map-v2/components/map-attributions';
import LayerManagerComponent from 'components/map-v2/components/layer-manager';

import './styles.scss';

class MapComponent extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    mapOptions: PropTypes.object,
    basemap: PropTypes.object,
    label: PropTypes.object,
    bbox: PropTypes.array,
    draw: PropTypes.bool,
    handleMapMove: PropTypes.func,
    handleMapInteraction: PropTypes.func
  };

  static defaultProps = {
    bbox: {}
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      this.map.invalidateSize();
      L.control.scale({ maxWidth: 80 }).addTo(this.map); // eslint-disable-line
    });
  }

  render() {
    const {
      className,
      loading,
      error,
      mapOptions,
      basemap,
      label,
      bbox,
      draw,
      handleMapMove,
      handleMapInteraction
    } = this.props;

    return (
      <div
        style={{ backgroundColor: basemap.color }}
        className={cx('c-map', className)}
      >
        <Map
          onReady={map => { this.map = map; }}
          mapOptions={mapOptions}
          basemap={basemap}
          label={label}
          bounds={
            bbox
              ? {
                bbox,
                options: {
                  padding: [50, 50]
                }
              }
              : {}
          }
          events={{ move: handleMapMove }}
        >
          {map => (
            <Fragment>
              <LayerManagerComponent
                map={map}
                handleMapInteraction={handleMapInteraction}
              />
              <Popup map={map} />
              {draw && <MapDraw map={map} />}
            </Fragment>
          )}
        </Map>
        <Icon className="icon-crosshair" icon={iconCrosshair} />
        <MapAttributions className={cx('map-attributions')} />
        {loading && (
          <Loader className="map-loader" theme="theme-loader-light" />
        )}
        {!loading &&
          error && (
            <NoContent message="An error occured. Please try again later." />
          )}
      </div>
    );
  }
}

export default MapComponent;
