// create global CSSArrowPlease if it doesn't exist
if (!('CSSArrowPlease' in window)) window.CSSArrowPlease = {};

(function (G) {

  // ----- Application ----- //

  /**
  @class App
  @constructor
  @description 
    Main application object. 
    Acts as view dispatcher
  **/
  var App = function () { 
    this.init.apply(this, arguments);
  };

  App.prototype = {

    init: function () {
      this.model = new G.Arrow();
      this._initViews();
    },

    /**
    @method _initViews
    @description initializes views
    @protected
    **/
    _initViews: function () {
      var model = this.model;

      this.views = [
        new G.ArrowConfigurationView({ model: model, container: $('.configuration') }), 
        new G.ArrowPreviewView({ model: model, container: $('.preview') }), 
        new G.ArrowCSSView({ model: model, container: $('.result_code') }), 
      ];
    },

    render: function () {
      $.each(this.views, function (i, view) {
        view.render();
      });
    }

  };

  // Expose
  G.App = App;

}(window.CSSArrowPlease));
