/**
 *
 * @return
 */
define(['abstract/layer/ImageLayerClass'], (ImageLayerClass) => {
    const LMrkCommCustomaryLayer = ImageLayerClass.extend({
      options: {
        urlTemplate:
          'http://gis.wri.org/server/rest/services/LandMark/comm_comm_CustomaryTenure/MapServer/tile{/z}{/y}{/x}',
        dataMaxZoom: 7
      }
    });

    return LMrkCommCustomaryLayer;
  });
