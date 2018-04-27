/**
 *
 * @return
 */
define([
    'abstract/layer/ImageLayerClass',
  ], function(ImageLayerClass) {

    'use strict';

    var LMrkIndDocumentedLayer = ImageLayerClass.extend({

      options: {
        urlTemplate: 'http://gis.wri.org/server/rest/services/LandMark/comm_ind_Documented/MapServer/tile{/z}{/y}{/x}',
        dataMaxZoom: 7
      }

    });

    return LMrkIndDocumentedLayer;

  });
