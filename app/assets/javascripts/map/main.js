// Application entry point
require([
  'backbone',
  'underscore',
  'router',
  'analysis',
  'mps'
], function (Backbone, _, router, analysis, mps) {
  console.log('Main entry point...');

  if (!Backbone.History.started) {
    console.log('Backbone.history.start');
    Backbone.history.start({pushState: true});
  }

  if (!String.prototype.format) {
    String.prototype.format = function() {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function(match, number) { 
        return typeof args[number] != 'undefined' ? args[number] : match;
      });
    };
  }

  /**
   * Returns true if string contains substring.
   */
  if (!String.prototype.contains) {
    String.prototype.contains = function(substr) {
      var args = arguments;
      return this.indexOf(substr) > -1;
    };
  }

  _.mixin({
    capitalize: function(string) {
      return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
    }
  });

  _.mixin({
    parseUrl: function() {
      var a = /\+/g;  // Regex for replacing addition symbol with a space
      var r = /([^&=]+)=?([^&]*)/g;
      var d = function (s) { return decodeURIComponent(s.replace(a, " ")); };
      var q = window.location.search.substring(1);
      var urlParams = {};
      
      // Parses URL parameters:
      while ((e = r.exec(q))) {
        urlParams[d(e[1])] = d(e[2]);
      }

      return urlParams;
    }
  });

  // For dev
  window.analysis = analysis;
  window.mps = mps;
  window.router = router;
});