import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { track } from 'utils/analytics';

import SubnavMenu from 'components/subnav-menu';
import Card from 'components/ui/card';
import Loader from 'components/ui/loader';
import PTWProvider from 'providers/ptw-provider';

import './explore-styles.scss';

class Explore extends PureComponent {
  render() {
    const {
      section,
      data,
      setMenuSettings,
      handleViewOnMap,
      description,
      mapState,
      loading
    } = this.props;
    const links = [
      {
        label: 'Topics',
        active: section === 'topics',
        onClick: () => {
          setMenuSettings({ exploreType: 'topics' });
          track('mapMenuExploreCategory', { label: 'topics' });
        }
      },
      {
        label: 'Places to watch',
        active: section === 'placesToWatch',
        onClick: () => {
          setMenuSettings({ exploreType: 'placesToWatch' });
          track('mapMenuExploreCategory', { label: 'places to watch' });
        }
      },
      {
        label: 'Stories',
        active: section === 'stories',
        onClick: () => {
          setMenuSettings({ exploreType: 'stories' });
          track('mapMenuExploreCategory', { label: 'stories' });
        }
      }
    ];

    return (
      <div className="c-explore">
        <SubnavMenu
          links={links}
          className="explore-menu"
          theme="theme-subnav-small-light"
        />
        <div className="content">
          <div className="row">
            <div className="column small-12">
              <div className="description">
                {section === 'placesToWatch' ? (
                  <Fragment>
                    {description}
                    <PTWProvider date={new Date()} />
                  </Fragment>
                ) : (
                  description
                )}
              </div>
            </div>
            {!loading &&
              data &&
              data.map(item => (
                <div
                  key={item.slug || item.id}
                  className="column small-12 medium-6"
                >
                  <Card
                    className="map-card"
                    theme="theme-card-small"
                    data={{
                      ...item,
                      buttons: item.buttons.map(b => ({
                        ...b,
                        ...(b.text === 'VIEW ON MAP' && {
                          onClick: () => {
                            handleViewOnMap({ ...item.payload });
                            track('mapMenuAddTopic', { label: item.title });
                          }
                        })
                      }))
                    }}
                    active={isEqual(item.payload.map, mapState)}
                  />
                </div>
              ))}
            {loading && <Loader />}
          </div>
        </div>
      </div>
    );
  }
}

Explore.propTypes = {
  section: PropTypes.string,
  data: PropTypes.array,
  setMenuSettings: PropTypes.func,
  description: PropTypes.string,
  mapState: PropTypes.object,
  loading: PropTypes.bool,
  handleViewOnMap: PropTypes.func
};

export default Explore;
