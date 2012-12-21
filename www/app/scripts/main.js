define(function(require) {

  var $ = require('jquery');
  var FastClick = require('fastclick');
  var app = require('app');
  var Router = require('router');
  var Region = require('region');

  require('core/device');
  require('plugins/tappivate');

  $(function() {
    // Define the regions in the page; create a Region for each by passing
    // in the parent element.
    var regions = {
      'main': new Region({
        el: '#main'
      })
    };

    // Set up the router for the application and pass in the regions.
    app.router = new Router({
      regions: regions,
      el: '#app'
    });

    // Setup FastClick to prevent 300ms button delay
    new FastClick(document.getElementById('app'));

    // Setup tappivate to mimic native button taps
    $('#app').tappivate();

    // Add link to app in window so that native layer can trigger events
    window.jsapp = {
      'nav': function(hash) {
        Backbone.history.navigate(hash, true);
      }
    };

    // Don't start routing until phonegap is ready.
    document.addEventListener('deviceready', function() {
      // Trigger the initial route, set the
      // root folder to '' by default.  Change in app.js.
      Backbone.history.start({
        pushState: false,
        root: app.root
      });
    });

  });


  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router. If the link has a `data-bypass`
  // attribute, bypass the delegation completely.
  $(document).on("click", "a[href]:not([data-bypass])", function(evt) {
    // Get the absolute anchor href.
    var href = {
      prop: $(this).prop("href"),
      attr: $(this).attr("href")
    };
    // Get the absolute root.
    var root = location.protocol + "//" + location.host + app.root;

    // Ensure the root is part of the anchor href, meaning it's relative.
    if(href.prop.slice(0, root.length) === root) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // Push to the native bridge to ask to navigate
      var title = $(this).attr("data-nav");
      cordova.exec(
      function(winParam) {
        console.log('cordova.exec success');
      }, function(error) {
        console.log('cordova.exec error');
      }, "NativeBridge", "pushRoute", [{
        title: $(this).attr("data-nav"),
        hash: href.attr
      }]);

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events. The Router's internal `navigate` method
      // calls this anyways.  The fragment is sliced from the root.
      //Backbone.history.navigate(href.attr, true);
    }
  });

  $(document).on("click", "[data-nav]", function(evt) {

  });

});