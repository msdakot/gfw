/**
 * The MapView class for the Google Map.
 *
 * @return MapView class (extends Backbone.View)
 */
define([
  'backbone',
  'underscore',
  'presenters/MapPresenter',
  'views/AnalysisButtonView'
], function(Backbone, _, Presenter, AnalysisButtonView) {

  var MapView = Backbone.View.extend({

     el: '#map',

    /**
     * Constructs a new MapView and its presenter.
     */
    initialize: function() {      
      this.presenter = new Presenter(this);
    },

    render: function() {
      var options = {
        minZoom: 3,
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        center: new google.maps.LatLng(15, 27)
      };

      this.map = new google.maps.Map(this.el, options);
      this.resize();
      this.addCompositeViews();
      this.addListeners();
    },

    addCompositeViews: function() {
      this.$el.append(new AnalysisButtonView().$el);
    },

    addListeners: function() {
      google.maps.event.addListener(this.map, 'zoom_changed', 
        _.bind(function() {
          this.onZoomChange();
        }, this)
      );
      google.maps.event.addListener(this.map, 'dragend', 
        _.bind(function() {
          this.onCenterChange();
      }, this));
    },

    setZoom: function(zoom) {
      this.map.setZoom(zoom);
    },

    onZoomChange: function() {
      this.presenter.onZoomChange(this.map.zoom);
    },

    onCenterChange: function() {
      var center = this.map.getCenter();
      var lat = center.lat();
      var lng = center.lng();

      this.presenter.onCenterChange(lat, lng);
    },

    resize: function() {
      google.maps.event.trigger(this.map, 'resize');
      this.map.setZoom(this.map.getZoom());
      this.map.setCenter(this.map.getCenter());
    }
    
  });

  return MapView;

});