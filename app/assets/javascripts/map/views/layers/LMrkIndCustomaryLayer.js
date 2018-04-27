/**
 *
 * @return
 */
define(['abstract/layer/ImageLayerClass'], (ImageLayerClass) => {
  const LMrkIndCustomaryLayer = ImageLayerClass.extend({
    options: {
      urlTemplate:
        'http://gis.wri.org/server/rest/services/LandMark/comm_ind_CustomaryTenure/MapServer/tile{/z}{/y}{/x}',
      dataMaxZoom: 7
    }
  });

  return LMrkIndCustomaryLayer;
});
