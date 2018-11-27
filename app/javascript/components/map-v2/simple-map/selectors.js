import { createSelector, createStructuredSelector } from 'reselect';

import { getMapOptions, getBasemap, getLabels, getBbox, getCanBound, getDraw, getActiveLayers } from 'components/map-v2/selectors';

// get list data
const getLoading = state =>
  state.datasets.loading || state.geostore.loading || state.map.loading;
const getGeostore = state => state.geostore.geostore || null;
const selectEmbed = state =>
  (state.location &&
    state.location.pathname &&
    state.location.pathname.includes('embed')) ||
  null;

export const getLayerBbox = createSelector([getActiveLayers], layers => {
  const layerWithBbox =
    layers && layers.find(l => l.bbox || (l.layerConfig && l.layerConfig.bbox));
  const layerBbox =
    layerWithBbox &&
    (layerWithBbox.bbox ||
      (layerWithBbox.layerConfig && layerWithBbox.layerConfig.bbox));
  return layerBbox;
});

export const getGeostoreBbox = createSelector(
  [getGeostore],
  geostore => geostore && geostore.bbox
);

export const getMapProps = createStructuredSelector({
  mapOptions: getMapOptions,
  basemap: getBasemap,
  label: getLabels,
  loading: getLoading,
  layerBbox: getLayerBbox,
  geostoreBbox: getGeostoreBbox,
  bbox: getBbox,
  canBound: getCanBound,
  draw: getDraw,
  embed: selectEmbed
});
