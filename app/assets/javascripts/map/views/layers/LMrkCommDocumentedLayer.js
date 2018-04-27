/**
 *
 * @return
 */
define(['abstract/layer/ImageLayerClass'], (ImageLayerClass) => {
  const LMrkCommDocumentedLayer = ImageLayerClass.extend({
    options: {
      urlTemplate:
        'http://gis.wri.org/server/rest/services/LandMark/comm_comm_Documented/MapServer/tile{/z}{/y}{/x}',
      dataMaxZoom: 7
    }
  });

  return LMrkCommDocumentedLayer;
});
