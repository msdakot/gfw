/**
 *
 * @return
 */
define([
    'abstract/layer/ImageLayerClass',
  ], function(ImageLayerClass) {

    'use strict';

    var LMrkIndFormalLayer = ImageLayerClass.extend({

      options: {
        urlTemplate: 'http://gis.wri.org/server/rest/services/LandMark/comm_ind_FormalLandClaim/MapServer/tile{/z}{/y}{/x}',
        dataMaxZoom: 7
      }

    });

    return LMrkIndFormalLayer;

  });
