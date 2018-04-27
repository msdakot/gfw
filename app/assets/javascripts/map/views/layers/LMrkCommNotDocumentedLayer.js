/**
 *
 * @return
 */
define(['abstract/layer/ImageLayerClass'], (ImageLayerClass) => {
  const LMrkCommNotDocumentedLayer = ImageLayerClass.extend({
    options: {
      urlTemplate:
        'http://gis.wri.org/server/rest/services/LandMark/comm_comm_NotDocumented/MapServer/tile/{z}/{y}/{x}',
      dataMaxZoom: 7
    }
  });

  return LMrkCommNotDocumentedLayer;
});
