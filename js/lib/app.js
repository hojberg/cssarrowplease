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
      this.currentView = '';

      this.dispatch();
    },

    dispatch: function () {
      if ($('.search').length > 0) {
        this.currentView = 'SearchView';
      }

      this.showView();
    },

    showView: function () {
      var view = this.currentView;

      if (view === 'SearchView') {
        new G.SearchView({
          container: $('.search')
        });
      } 
    }

  };

  // Expose
  G.App = App;

}(window.CSSArrowPlease));
