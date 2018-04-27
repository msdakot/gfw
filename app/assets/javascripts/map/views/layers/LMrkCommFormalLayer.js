/**
 *
 * @return
 */
define(['abstract/layer/ImageLayerClass'], ImageLayerClass => {
  const LMrkCommFormalLayer = ImageLayerClass.extend({
    options: {
      urlTemplate:
        'http://gis.wri.org/server/rest/services/LandMark/comm_comm_FormalLandClaim/MapServer/tile{/z}{/y}{/x}',
      dataMaxZoom: 7
    }
  });

  return LMrkCommFormalLayer;
});
