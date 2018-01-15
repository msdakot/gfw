import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import WidgetPieChart from 'pages/country/widget/components/widget-pie-chart';
import WidgetNumberedList from 'pages/country/widget/components/widget-numbered-list';
import COLORS from 'pages/country/data/colors.json';

import './widget-tree-located-styles.scss';

class WidgetTreeLocated extends PureComponent {
  render() {
    const {
      data,
      chartData,
      settings,
      handlePageChange,
      embed
    } = this.props;

    return (
      <div className="c-widget-tree-located">
        {data && chartData &&
          data.length > 0 && (
            <div className="locations-container">
              <WidgetPieChart className="locations-pie-chart" data={chartData} dataKey="percentage" />
              <WidgetNumberedList
                className="locations-list"
                data={data}
                settings={settings}
                handlePageChange={handlePageChange}
                colorRange={[COLORS.darkGreen, COLORS.nonForest]}
                linksDisabled={embed}
              />
            </div>
          )}
      </div>
    );
  }
}

WidgetTreeLocated.propTypes = {
  data: PropTypes.array,
  chartData: PropTypes.array,
  settings: PropTypes.object.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  embed: PropTypes.bool
};

export default WidgetTreeLocated;
