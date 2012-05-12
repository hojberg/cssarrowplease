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
      this._codeNode  = this.container.find('.code');
      this._copyNode  = this.container.find('.copy_code');

      this.model = options.model;
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
      var css = this.model.toCSS();

      this._codeNode.text( css );
      this._copyNode.text( css )
        .clippy({ transparent: true });

      return this;
    }

  };

  // Expose public api
  G.ArrowCSSView = ArrowCSSView;

}(window.CSSArrowPlease));
