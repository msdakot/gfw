import { createElement, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import isEqual from 'lodash/isEqual';

import * as actions from 'components/widgets/actions';
import WidgetComponent from './component';
import { makeGetWidgetProps } from './selectors';

class WidgetContainer extends Component {
  componentDidMount() {
    const {
      getData,
      getWidgetData,
      widget,
      location,
      settings,
      data
    } = this.props;
    const params = { ...location, ...settings };
    if (!data || data.noContent) {
      getWidgetData({ widget, getData, params });
    }
  }

  componentDidUpdate(prevProps) {
    const { location, settings, getData, getWidgetData, widget } = this.props;
    const settingsUpdateBlackList = [
      'startYear',
      'endYear',
      'activeData',
      'weeks',
      'page',
      'highlighted'
    ];
    let changedSetting = '';
    if (settings && prevProps.settings) {
      Object.keys(settings).forEach(s => {
        if (!isEqual(settings[s], prevProps.settings[s])) {
          changedSetting = s;
        }
      });
    }
    const hasSettingsChanged =
      settings &&
      prevProps.settings &&
      changedSetting &&
      !settingsUpdateBlackList.includes(changedSetting);
    const hasLocationChanged = !isEqual(location, prevProps.location);
    const params = { ...location, ...settings };
    if (hasSettingsChanged || hasLocationChanged) {
      getWidgetData({ widget, getData, params });
    }
  }

  handleDataHighlight = (highlighted, widget) => {
    const { setWidgetSettings } = this.props;
    setWidgetSettings({
      value: {
        highlighted
      },
      widget
    });
  };

  render() {
    return createElement(WidgetComponent, {
      ...this.props,
      handleDataHighlight: this.handleDataHighlight
    });
  }
}

WidgetContainer.propTypes = {
  settings: PropTypes.object,
  location: PropTypes.object,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  getData: PropTypes.func,
  getWidgetData: PropTypes.func,
  setWidgetSettings: PropTypes.func,
  widget: PropTypes.string
};

export default connect(makeGetWidgetProps, actions)(WidgetContainer);
