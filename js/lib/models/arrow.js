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
      // jquerify 'this'
      this._$self = $(this);

      this._createAttrs();
    },

    /**
    @method _createAttrs
    @description creates attributes from the ATTR constant
    @protected
    **/
    _createAttrs: function () {
      var ATTRS       = Arrow.ATTRS,
          attributes  = {};

      $.each(ATTRS, function (attr, value) {
        attributes[attr] = value;
      });

      this._attributes = attributes;
    },

    /**
    @method getAttrs
    @description returns all the attributes
    @returns {Object} all the model attributes
    **/
    getAttrs: function () {
      return this._attributes;
    },

    /**
    @method get
    @description returns the provided attribute
    @param {String} attr the attribute to return
    @returns {?} the attribute
    **/
    get: function (attr) {
      return this._attributes[attr];
    },

    /**
    @method set
    @description updates the provided attribute
    @param {String} attr the attribute to update
    @param {?} val the value to update with
    **/
    set: function (attr, val) {
      if (!(attr in this._attributes)) return;

      this._attributes[attr] = val;
      this.fire('change');
    },

    /**
    @method on
    @description adds event listeners
    @note uses jQuery custom events under the hood
    @param {String} evType the event type
    @param {Function} callback the event handler
    @param {Object} context the 'this' for the callback
    **/
    on: function (evType, callback, context) {
      var $self = this._$self;

      $self.on(
        evType, 
        $.proxy(callback, context || this)
      );
    },

    /**
    @method fire
    @description trigger event
    @note uses jQuery custom events under the hood
    @param {String} evType the event type
    **/
    fire: function (evType) {
      var $self = this._$self;

      $self.trigger(evType);
    },

    toCSS: function () {
      return $('.arrow_css_template').text();
    }

  };

  Arrow.ATTRS = {
    position:     'top',
    size:         10,
    color:        '#fff',
    borderWidth:  5,
    borderColor:  '#000'
  };

  // Expose
  G.Arrow = Arrow;

}(window.CSSArrowPlease));
