import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Joyride from 'react-joyride';
import { track } from 'utils/analytics';

import Button from 'components/ui/button';
import Icon from 'components/ui/icon';

import closeIcon from 'assets/icons/close.svg';
import exploreGreenIcon from 'assets/icons/explore-green.svg';
import analysisGreenIcon from 'assets/icons/analysis-green.svg';

import './styles.scss';

class MapTour extends PureComponent {
  componentDidUpdate(prevProps) {
    const { open } = this.props;
    if (open && open !== prevProps.open) {
      this.resetMapLayout();
    }
  }

  renderExitOptions = () => (
    <div className="tour-exit-actions">
      <p className="intro">
        Not sure what to do next? Here are some suggestions:
      </p>
      <Button
        className="guide-btn"
        theme="theme-button-clear theme-button-dashed"
        onClick={() => {
          this.props.setExploreView();
          this.props.setMapTourOpen(false);
          track('welcomeModal', { label: 'topics' });
        }}
      >
        <Icon className="guide-btn-icon" icon={exploreGreenIcon} />
        <p>
          Try out the Explore tab for an introduction to key forest topics and
          high priority areas with recent forest loss.
        </p>
      </Button>
      <Button
        className="guide-btn"
        theme="theme-button-clear theme-button-dashed"
        onClick={() => {
          this.props.setAnalysisView();
          this.props.setMapTourOpen(false);
          track('welcomeModal', { label: 'analysis' });
        }}
      >
        <Icon className="guide-btn-icon" icon={analysisGreenIcon} />
        <p>Test out our new and improved analysis features.</p>
      </Button>
    </div>
  );

  getSteps = () => {
    const { setAnalysisSettings, setMenuSettings, setMapSettings } = this.props;

    return [
      {
        target: '.map-tour-data-layers',
        content: 'Explore available data layers',
        disableBeacon: true,
        placement: 'right'
      },
      {
        target: '.map-tour-legend',
        placement: 'right',
        content: {
          text:
            'View and change settings for data layers on the map like date range and opacity. Click the "i" icons to learn more about a dataset.',
          next: () => {
            setAnalysisSettings({
              showAnalysis: true
            });
          },
          prev: () => {
            setAnalysisSettings({
              showAnalysis: false
            });
          }
        }
      },
      {
        target: '.map-tour-legend',
        placement: 'right',
        content: {
          text:
            'Analyze forest change within your area of interest by clicking a shape on the map or drawing or uploading a shape.',
          next: () => {
            setMenuSettings({
              menuSection: 'explore'
            });
          },
          prev: () => {
            setMenuSettings({
              menuSection: ''
            });
          }
        }
      },
      {
        target: '.map-tour-menu-panel',
        placement: 'right',
        content: {
          text:
            'Explore data related to important forest topics, Places to Watch (high priority areas with recent forest loss), and stories about forests.',
          next: () => {
            setMenuSettings({
              menuSection: 'search'
            });
          },
          prev: () => {
            setMenuSettings({
              menuSection: ''
            });
          }
        }
      },
      {
        target: '.map-tour-menu-panel',
        placement: 'right',
        content: {
          text: 'Search for a dataset, location or geographic coordinates.',
          next: () => {
            setMenuSettings({
              menuSection: ''
            });
            setMapSettings({
              showBasemaps: true
            });
          },
          prev: () => {
            setMenuSettings({
              menuSection: 'explore'
            });
          }
        }
      },
      {
        target: '.map-tour-basemaps',
        content: {
          text:
            'Customize the basemap, including the boundaries displayed and the color of the labels.',
          next: () => {
            setMapSettings({
              showBasemaps: false
            });
          },
          prev: () => {
            setMenuSettings({
              menuSection: 'search'
            });
            setMapSettings({
              showBasemaps: false
            });
          }
        }
      },
      {
        target: '.map-tour-recent-imagery',
        content:
          'View recent satellite imagery, searchable by date and cloud cover.'
      },
      {
        target: '.map-tour-map-controls',
        content:
          'Access basic map tools and information: zoom in/out share, expand, zoom level, lat/long coordinates.'
      },
      {
        target: '.map-tour-main-menu',
        content: 'Access the main navigation menu.'
      },
      {
        target: 'body',
        content: this.renderExitOptions
      }
    ];
  };

  resetMapLayout = () => {
    const { setAnalysisSettings, setMenuSettings } = this.props;
    setAnalysisSettings({ showAnalysis: false });
    setMenuSettings({ menuSection: '' });
  };

  renderTooltip = (
    { closeProps, backProps, content, primaryProps, isLastStep, index },
    numOfSteps
  ) => {
    let prevOnClick = backProps && backProps.onClick;
    let nextOnClick = primaryProps && primaryProps.onClick;
    let html = content;
    if (typeof content === 'object') {
      html = content.text;
      prevOnClick = e => {
        content.prev();
        setTimeout(() => backProps.onClick(e), 300);
      };
      nextOnClick = e => {
        content.next();
        setTimeout(() => primaryProps.onClick(e), 300);
      };
    }
    return (
      <div className="c-tour-tooltip">
        <button className="tour-close" {...closeProps}>
          <Icon icon={closeIcon} />
        </button>
        <div className="tour-step">
          {index + 1}/{numOfSteps}
        </div>
        <div className="tour-content">
          {typeof html === 'function' ? html() : html}
        </div>
        <div className="tour-btns">
          {index !== 0 && (
            <Button
              theme="theme-button-light"
              {...backProps}
              onClick={prevOnClick}
            >
              Prev
            </Button>
          )}
          {isLastStep ? (
            <Button {...closeProps}>Finish</Button>
          ) : (
            <Button {...primaryProps} onClick={nextOnClick}>
              Next
            </Button>
          )}
        </div>
      </div>
    );
  };

  render() {
    const { open, setMapTourOpen } = this.props;
    const steps = this.getSteps();
    return (
      open && (
        <Joyride
          steps={steps}
          run={open}
          continuous
          callback={data => {
            if (data.action === 'close' || data.type === 'tour:end') {
              setMapTourOpen(false);
            }
          }}
          spotlightPadding={0}
          tooltipComponent={e => this.renderTooltip(e, steps.length)}
          styles={{
            options: {
              overlayColor: 'rgba(17, 55, 80, 0.4)',
              zIndex: 1000
            }
          }}
        />
      )
    );
  }
}

MapTour.propTypes = {
  open: PropTypes.bool,
  setAnalysisSettings: PropTypes.func,
  setMapTourOpen: PropTypes.func,
  setMapSettings: PropTypes.func,
  setMenuSettings: PropTypes.func,
  setExploreView: PropTypes.func,
  setAnalysisView: PropTypes.func
};

export default MapTour;
