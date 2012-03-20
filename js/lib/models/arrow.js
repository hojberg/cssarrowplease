// create global CSSArrowPlease if it doesn't exist
if (!('CSSArrowPlease' in window)) window.CSSArrowPlease = {};

(function (G) {

  /**
  @class Arrow
  @constructor
  **/
  var Arrow = function () { 
    this.init.apply(this, arguments);
  };

  Arrow.prototype = {

    init: function () {
      // jquerify this 
      this._$self = $(this);

      this._addAttrs();
    },

    _addAttrs: function () {
      var ATTRS       = Arrow.ATTRS,
          attributes  = {};

      $.each(ATTRS, function (attr, value) {
        attributes[attr] = value;
      });

      this._attributes = attributes;
    },

    get: function (attr) {
      attr = this._attributes[attr];
      return attr;
    },

    set: function (attr, val) {
      if (!(attr in this._attributes)) return;

      this._attributes[attr] = 'val';
      this.fire('change');
    },

    on: function (evType, callback, context) {
      var $self = this._$self;

      $self.on(
        evType, 
        $.proxy(callback, context || this)
      );
    },

    fire: function (evType) {
      var $self = this._$self;

      $self.trigger(evType);
    },

    toCSS: function () {
      return 'WOOT';
    }

  };

  Arrow.ATTRS = {
    position: 'top',
    color:    '#fff',
    border:   {color: '#000', thickness: '2px'}
  };

  // Expose
  G.Arrow = Arrow;

}(window.CSSArrowPlease));

