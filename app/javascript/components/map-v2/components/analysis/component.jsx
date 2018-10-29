import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Button from 'components/ui/button/button-component';
import Loader from 'components/ui/loader';
import ChoseAnalysis from 'components/map-v2/components/analysis/components/chose-analysis';
import PolygonAnalysis from 'components/map-v2/components/analysis/components/draw-analysis';

import './styles.scss';

class AnalysisComponent extends PureComponent {
  render() {
    const {
      className,
      loading,
      location,
      clearAnalysis,
      goToDashboard,
      error,
      handleCancelAnalysis,
      handleFetchAnalysis,
      setSubscribeSettings,
      endpoints,
      embed
    } = this.props;
    const hasLayers = endpoints && !!endpoints.length;

    return (
      <Fragment>
        <div className={cx('c-analysis', className)}>
          {loading && (
            <Loader className={cx('analysis-loader', { fetching: loading })} />
          )}
          {location.type &&
            location.adm0 &&
            (loading || (!loading && error)) && (
              <div className={cx('cancel-analysis', { fetching: loading })}>
                {!loading &&
                  error && (
                    <Button
                      className="refresh-analysis-btn"
                      onClick={() => handleFetchAnalysis(location, endpoints)}
                    >
                      REFRESH ANALYSIS
                    </Button>
                  )}
                <Button
                  className="cancel-analysis-btn"
                  onClick={handleCancelAnalysis}
                >
                  CANCEL ANALYSIS
                </Button>
                {!loading && error && <p className="error-message">{error}</p>}
              </div>
            )}
          {location.type && location.adm0 ? (
            <PolygonAnalysis
              clearAnalysis={clearAnalysis}
              goToDashboard={goToDashboard}
              hasLayers={hasLayers}
            />
          ) : (
            <ChoseAnalysis />
          )}
        </div>
        {!loading &&
          !error &&
          location.type &&
          location.adm0 && (
            <div className="analysis-actions">
              {location.type === 'country' && (
                <Button
                  className="analysis-action-btn"
                  theme="theme-button-light"
                  extLink={window.location.href.replace(
                    embed ? 'embed/map' : 'map',
                    'dashboards'
                  )}
                  target="_blank"
                >
                  DASHBOARD
                </Button>
              )}
              <Button
                className="analysis-action-btn"
                onClick={() => setSubscribeSettings({ open: true })}
              >
                SUBSCRIBE
              </Button>
            </div>
          )}
      </Fragment>
    );
  }
}

AnalysisComponent.propTypes = {
  clearAnalysis: PropTypes.func,
  className: PropTypes.string,
  endpoints: PropTypes.array,
  loading: PropTypes.bool,
  location: PropTypes.object,
  goToDashboard: PropTypes.func,
  error: PropTypes.string,
  handleCancelAnalysis: PropTypes.func,
  handleFetchAnalysis: PropTypes.func,
  embed: PropTypes.bool,
  setSubscribeSettings: PropTypes.func
};

export default AnalysisComponent;
