import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import WidgetPieChart from 'pages/country/widget/components/widget-pie-chart';
import WidgetPieChartLegend from 'pages/country/widget/components/widget-pie-chart-legend';
import Loader from 'components/loader/loader';
import WidgetHeader from 'pages/country/widget/components/widget-header';
import NoContent from 'components/no-content';

import './widget-tree-cover-styles.scss';

class WidgetTreeCover extends PureComponent {
  render() {
    const {
      isLoading,
      data,
      settings,
      options,
      config,
      setTreeCoverSettingsIndicator,
      setTreeCoverSettingsThreshold,
      locationNames,
      title,
      anchorLink,
      widget
    } = this.props;

    return (
      <div className="c-widget c-widget-tree-cover">
        <WidgetHeader
          widget={widget}
          title={title}
          anchorLink={anchorLink}
          locationNames={locationNames}
          settingsConfig={{
            isLoading,
            config,
            settings,
            options,
            actions: {
              onIndicatorChange: setTreeCoverSettingsIndicator,
              onThresholdChange: setTreeCoverSettingsThreshold
            }
          }}
        />
        <div className="container">
          {isLoading && <Loader />}
          {!isLoading &&
            data &&
            data.length === 0 && (
              <NoContent
                message={`No data in selection for ${locationNames.current &&
                  locationNames.current.label}`}
              />
            )}
          {!isLoading &&
            data && (
              <div className="pie-chart-container">
                <WidgetPieChartLegend
                  data={data}
                  config={{
                    ...settings,
                    format: '.3s',
                    unit: 'ha',
                    key: 'value'
                  }}
                />
                <WidgetPieChart className="cover-pie-chart" data={data} />
              </div>
            )}
        </div>
      </div>
    );
  }
}

WidgetTreeCover.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  locationNames: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  config: PropTypes.object,
  options: PropTypes.object,
  setTreeCoverSettingsIndicator: PropTypes.func.isRequired,
  setTreeCoverSettingsThreshold: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  anchorLink: PropTypes.string.isRequired,
  widget: PropTypes.string.isRequired
};

export default WidgetTreeCover;
