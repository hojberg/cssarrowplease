// create global CSSArrowPlease if it doesn't exist
if (!('CSSArrowPlease' in window)) window.CSSArrowPlease = {};

(function (G) {

  /**
  @class ArrowConfigurationView
  @constructor
  **/
  var ArrowConfigurationView = function () { 
    this.init.apply(this, arguments);
  };

  ArrowConfigurationView.prototype = {

    init: function (options) {
      this.container  = options.container;
      this.model      = options.model;

      this._attachEvents();
    },

    /**
    @method render
    @description TODO
    @chainable
    **/
    render: function () {
      return this;
    },

    /**
    @method _attachEvents
    @description attaches dom events
    @protected
    **/
    _attachEvents: function () {
      var _updateModelProxy = $.proxy( this._updateModel, this),
          container         = this.container,
          selectors         = [ '.position',
                                '.size',
                                '.color',
                                '.border_width',
                                '.border_color'
                              ];

      $.each(selectors, function (i, selector) {
        container.delegate(selector, 'change', _updateModelProxy);
      });
    },

    _updateModel: function (ev) {
      var target  = $(ev.currentTarget),
          val     = target.val(),
          attr;


      if (target.hasClass('border_width')) {
        attr = 'borderWidth';
      }
      else if (target.hasClass('border_color')) {
        attr = 'borderColor';
      }
      else {
        attr = target.attr('class');
      }

      this.model.set(attr, val);
    }

  };

  // Expose public api
  G.ArrowConfigurationView = ArrowConfigurationView;

}(window.CSSArrowPlease));

