// create global CSSArrowPlease if it doesn't exist
if (!('CSSArrowPlease' in window)) window.CSSArrowPlease = {};

(function (G) {

  /**
  @class ArrowPreviewView
  @constructor
  **/
  var ArrowPreviewView = function () { 
    this.init.apply(this, arguments);
  };

  ArrowPreviewView.prototype = {

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
    @description 
      renders an arrow using the 
      model configuration
    @chainable
    **/
    render: function () {
      var model     = this.model,
          container = this.container;

      container.find('.preview_styles').text(
        model.toCSS()
      );

      return this;
    }

  };

  // Expose public api
  G.ArrowPreviewView = ArrowPreviewView;

}(window.CSSArrowPlease));
