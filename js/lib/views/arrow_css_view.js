// create global CSSArrowPlease if it doesn't exist
if (!('CSSArrowPlease' in window)) window.CSSArrowPlease = {};

(function (G) {

  /**
  @class ArrowCSSView
  @constructor
  **/
  var ArrowCSSView = function () { 
    this.init.apply(this, arguments);
  };

  ArrowCSSView.prototype = {

    init: function (options) {
      this.container  = options.container;
      this.model      = options.model;

      this.model.on('change', this._handleChange, this);
    },

    /**
    @method _handleChange
    @description handles changes to the model
    @chainable
    **/
    _handleChange: function () {
      this.render();
    },

    /**
    @method render
    @description renders the model's css
    @chainable
    **/
    render: function () {
      this.container.html(this.model.toCSS());
      return this;
    }

  };

  // Expose public api
  G.ArrowCSSView = ArrowCSSView;

}(window.CSSArrowPlease));
