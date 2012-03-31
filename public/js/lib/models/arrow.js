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
    @method invertedPosition
    @description 
      returns the opposite of the position
      so 'top' becomes 'bottom' and 'left' becomes 'right' 
    @returns {String}
    **/
    invertedPosition: function () {
      var pos = this.get('position');

      if      ( pos === 'top'   ) return 'bottom';
      else if ( pos === 'bottom') return 'top';
      else if ( pos === 'left'  ) return 'right';
      else if ( pos === 'right' ) return 'left';
    },

    /**
    @method _baseCSS
    @description generates the base css
    @returns {String} css
    @protected
    **/
    _baseCSS: function () {
      var iPos        = this.invertedPosition(),
          color       = this.get('color'),
          borderWidth = this.get('borderWidth'),
          borderColor = this.get('borderColor'),
          hasBorder   = borderWidth > 0,
          css         = '.arrow_box {\n';

      css += '\tposition: relative;\n';
      css += '\tbackground: ' + color + ';\n';

      if (hasBorder) css += '\tborder: ' + borderWidth + 'px solid ' + borderColor + ';\n';

      css += '}\n';
      css += '.arrow_box:after';
      
      if (hasBorder) css += ', .arrow_box:before {\n';

      css += '\t' + iPos +': 100%;\n';

      css += '\tborder: solid transparent;\n';
      css += '\tcontent: " ";\n';
      css += '\theight: 0;\n';
      css += '\twidth: 0;\n';
      css += '\tposition: absolute;\n';

      css += '}\n';

      return css;
    },

    /**
    @method _arrowCSS
    @description generates arrow css
    @param {String} color the color of the arrow
    @param {Integer} size the size of the arrow
    @param {String} layer :after or :before (defaults to :after)
    @returns {String} css
    @protected
    **/
    _arrowCSS: function (color, size, layer) {
      var pos       = this.get('position'),
          iPos      = this.invertedPosition(),
          css       = ".arrow_box:";

      layer = layer || 'after';

      css += layer + ' {\n';

      css += '\tborder-' + iPos + '-color: ' + color + ';\n';
      css += '\tborder-width: ' + size + 'px;\n';

      if (pos === 'top' || pos === 'bottom') {
        css += '\tleft: 50%;\n\tmargin-left: -' + size + 'px;\n';
      }
      else {
        css += '\ttop: 50%;\n\tmargin-top: -' + size + 'px;\n';
      }

      css += '}';

      return css;
    },

    /**
    @method _baseArrowCSS
    @description generates the base arrow
    @returns {String} css
    @protected
    **/
    _baseArrowCSS: function () {
      return this._arrowCSS(
        this.get('color'),
        this.get('size'),
        'after'
      );
    },

    /**
    @method _arrowBorderCSS
    @description generates the border arrow
    @returns {String} css
    @protected
    **/
    _arrowBorderCSS: function () {
      return this._arrowCSS(
        this.get('borderColor'),
        this.get('size') + (this.get('borderWidth') * 2),
        'before'
      );
    },

    /**
    @method toCSS
    @description returns a CSS representation of the arrow
    @returns {String} css
    **/
    toCSS: function () {

      var css = [
        this._baseCSS(),
        this._baseArrowCSS(),
        this._arrowBorderCSS()
      ];

      return css.join('\n');
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
    }

  };

  Arrow.ATTRS = {
    position:     'top',
    size:         10,
    color:        '#8ebf37',
    borderWidth:  1,
    borderColor:  '#4d710d'
  };

  // Expose
  G.Arrow = Arrow;

}(window.CSSArrowPlease));