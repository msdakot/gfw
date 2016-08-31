
/**
 * The MapMiniUploadView view.
 *
 * @return MapMiniUploadView view (extends Backbone.View)
 */
define([
  'underscore',
  'handlebars',
  'amplify',
  'turf',
  'mps',
  'map/services/ShapefileNewService',
  'helpers/geojsonUtilsHelper',
], function(_, Handlebars, amplify, turf, mps, ShapefileService, geojsonUtilsHelper) {

  'use strict';

  var MapMiniUploadView = Backbone.View.extend({

    config: {
      FILE_SIZE_LIMIT: 1000000,
      FILE_SIZE_MESSAGE: 'The selected file is quite large and uploading it might result in browser instability. Do you want to continue?'
    },

    el: '#map-upload',

    events: {
      'change #input-upload-shape' : 'onChangeFileShape',
      'dragenter' : 'onDragenterShape',
      'dragleave' : 'onDragleaveShape',
      'dragend' : 'onDragendShape',
      'drop' : 'onDropShape'
    },

    status: new (Backbone.Model.extend({
      defaults: {
        geosjon: null,
        overlay: null,
        overlay_stroke_weight: 2
      }
    })),

    initialize: function(map) {
      this.map = map;
      this.cache();
      this.listeners();
    },

    cache: function() {
    },

    listeners: function() {
    },

    /**
     * UI EVENTS
     * - onChangeFileShape
     * - onDragoverShape
     * - onDragendShape
     * - onDropShape
    */
    onChangeFileShape: function(e) {
      var file = e.currentTarget.files[0];
      if (file) {
        this.uploadFile(file);
      }
    },

    onDragenterShape: function(e) {
      this.$el.addClass('-moving');
      return false;
    },

    onDragleaveShape: function(e) {
      this.$el.removeClass('-moving');
    },

    onDragendShape: function(e) {
      this.$el.removeClass('-moving');
      return false;
    },

    onDropShape: function(e, data, clone, element) {
      e && e.preventDefault();
      var file = e.originalEvent.dataTransfer.files[0];
      this.uploadFile(file);
      return false;
    },

    /**
     * UPLOAD FILES
     *
     * - uploadFile
     */
    uploadFile: function(file) {
      if (file.size > this.config.FILE_SIZE_LIMIT && !window.confirm(this.config.FILE_SIZE_MESSAGE)) {
        this.$el.removeClass('-moving');
        return;
      }

      // mps.publish('Spinner/start', []);

      ShapefileService.save(file)
        .then(function(response) {
          var features = response.data.attributes.features;
          if (!!features) {
            var geojson = features.reduce(turf.union),
                bounds = geojsonUtilsHelper.getBoundsFromGeojson(geojson),
                geometry = geojson.geometry;

            this.drawGeojson(geometry);
            this.map.fitBounds(bounds);

            this.status.set('geojson', geometry);
          }
        }.bind(this))

        .fail(function(response){
          var errors = response.errors;
          _.each(errors, function(error){
            if (error.detail == 'File not valid') {
              this.publishNotification('notification-file-not-valid');
            }
          }.bind(this))

        }.bind(this));

      this.$el.removeClass('-moving');
    },

    /**
     * HELPERS
     * getGeojson
     * @param  {object} overlay
     * @return {object:geojson}
     */
    getGeojson: function(overlay) {
      var paths = overlay.getPath().getArray();
      return geojsonUtilsHelper.pathToGeojson(paths);
    },

    /**
     * drawGeojson
     * @param  {object:geojson} geojson
     * @return {void}
     */
    drawGeojson: function(geojson) {
      var paths = geojsonUtilsHelper.geojsonToPath(geojson);
      var overlay = new google.maps.Polygon({
        paths: paths,
        editable: (geojson.type == 'Polygon'),
        strokeWeight: this.status.get('overlay_stroke_weight'),
        fillOpacity: 0,
        fillColor: '#FFF',
        strokeColor: '#A2BC28'
      });

      overlay.setMap(this.map);

      this.status.set('overlay', overlay, { silent: true });
      this.status.set('geojson', this.getGeojson(overlay), { silent: true });

      // this.eventsDrawing();

      if (this.status.get('fit_to_geom')) {
        this.map.fitBounds(overlay.getBounds());
      }
    }




  });

  return MapMiniUploadView;

});
