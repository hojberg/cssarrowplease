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
    @method hexToRGB
    @description 
      returns an rgb color from an hex color
    @returns {Array}
    **/
    hexToRGB: function (h) {
      if ( typeof h !== 'string' || !h.match(/^#([0-9A-F]{3}$)|([0-9A-F]{6}$)/i) ) return [0, 0, 0];
      else if ( h.match(/^(#[0-9a-f]{3})$/i) ) h = '#' + h[1] + h[1] + h[2] + h[2] + h[3] + h[3];
      var rgb = [],
          i = 1;

      for(; i < 6; i+=2) {
        rgb.push(parseInt(h.substring(i, i + 2), 16));
      }
      return rgb;
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
      
      if (hasBorder)  css += ', .arrow_box:before {\n';
      else            css += ' {\n';

      css += '\t' + iPos +': 100%;\n';

      css += '\tborder: solid transparent;\n';
      css += '\tcontent: " ";\n';
      css += '\theight: 0;\n';
      css += '\twidth: 0;\n';
      css += '\tposition: absolute;\n';
      css += '\tpointer-events: none;\n';

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
          rgbColor  = this.hexToRGB(color),
          css       = ".arrow_box:";

      layer = layer || 'after';

      css += layer + ' {\n';

      css += '\tborder-color: rgba(' + rgbColor.join(', ') + ', 0);\n';
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
      var css = '',
          borderWidth = this.get('borderWidth');
      
      if (borderWidth > 0) {
        css = this._arrowCSS(
          this.get('borderColor'),
          this.get('size') + Math.round(borderWidth * 1.41421356), // cos(PI/4) * 2
          'before'
        );
      }

      return css;
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
    @method _baseLESS
    @description generates the base less
    @returns {String} less
    @protected
    **/
    _baseLESS: function () {
      var pos         = this.get('position'),
          iPos        = this.invertedPosition(),
          color       = this.get('color'),
          borderWidth = this.get('borderWidth') + 'px',
          borderColor = this.get('borderColor'),
          size        = this.get('size') + 'px',
          hasBorder   = parseInt(borderWidth) > 0,
          less        = '@arrow_size : ' + size + ';\n';

      less += '@arrow_color: ' + color + ';\n';
      less += '@arrow_border_width : ' + borderWidth + ';\n';
      less += '@arrow_border_color : ' + borderColor + ';\n\n';

      less += '.arrow_box {\n';
      less += '\tposition: relative;\n';
      less += '\tbackground: @arrow_color;\n';

      if (hasBorder) less += '\tborder: @arrow_border_width solid @arrow_border_color;\n';

      less += '\t&:after';
      
      if (hasBorder)  less += ', &:before {\n';
      else            less += ' {\n';

      less += '\t\t' + iPos +': 100%;\n';
      less += '\t\tborder: solid transparent;\n';
      less += '\t\tcontent: " ";\n';
      less += '\t\theight: 0;\n';
      less += '\t\twidth: 0;\n';
      less += '\t\tposition: absolute;\n';
      less += '\t\tpointer-events: none;\n';
      less += '\t}\n';

      less += '\t&:after{\n';
      less += '\t\tborder-color: hsla(hue(@arrow_color), saturation(@arrow_color), lightness(@arrow_color), 0);\n'
      less += '\t\tborder-' + iPos + '-color: @arrow_color;\n';
      less += '\t\tborder-width: @arrow_size;\n';
      if (pos === 'top' || pos === 'bottom') {
        less += '\t\tleft: 50%;\n\t\tmargin-left: -@arrow_size;\n';
      }
      else {
        less += '\t\ttop: 50%;\n\t\tmargin-top: -@arrow_size;\n';
      }
      less += '\t}\n';


      less += '\t&:before{\n';
      less += '\t\tborder-color: hsla(hue(@arrow_border_color), saturation(@arrow_border_color), lightness(@arrow_border_color), 0);\n'
      less += '\t\tborder-' + iPos + '-color: @arrow_border_color;\n';
      less += '\t\tborder-width: (@arrow_size + round(@arrow_border_width * 1.41421356));\n';
      if (pos === 'top' || pos === 'bottom') {
        less += '\t\tleft: 50%;\n\t\tmargin-left: -(@arrow_size + round(@arrow_border_width * 1.41421356));\n';
      }
      else {
        less += '\t\ttop: 50%;\n\t\tmargin-top: -(@arrow_size + round(@arrow_border_width * 1.41421356));\n';
      }
      less += '\t}\n';

      less += '}\n';

      return less;
    },

    /**
    @method toLESS
    @description returns a LESS representation of the arrow
    @returns {String} less
    **/
    toLESS: function() {
      return this._baseLESS();
    },

    /**
    @method _baseSCSS
    @description generates the base scss
    @returns {String} scss
    @protected
    **/
    _baseSCSS: function () {
      var pos         = this.get('position'),
          iPos        = this.invertedPosition(),
          color       = this.get('color'),
          borderWidth = this.get('borderWidth') + 'px',
          borderColor = this.get('borderColor'),
          size        = this.get('size') + 'px',
          hasBorder   = parseInt(borderWidth) > 0,
          scss        = '$arrow_size : ' + size + ';\n';

      scss += '$arrow_color: ' + color + ';\n';
      scss += '$arrow_border_width : ' + borderWidth + ';\n';
      scss += '$arrow_border_color : ' + borderColor + ';\n\n';

      scss += '.arrow_box {\n';
      scss += '\tposition: relative;\n';
      scss += '\tbackground: $arrow_color;\n';

      if (hasBorder) scss += '\tborder: $arrow_border_width solid $arrow_border_color;\n';

      scss += '\t&:after';
      
      if (hasBorder)  scss += ', &:before {\n';
      else            scss += ' {\n';

      scss += '\t\t' + iPos +': 100%;\n';
      scss += '\t\tborder: solid transparent;\n';
      scss += '\t\tcontent: " ";\n';
      scss += '\t\theight: 0;\n';
      scss += '\t\twidth: 0;\n';
      scss += '\t\tposition: absolute;\n';
      scss += '\t\tpointer-events: none;\n';
      scss += '\t}\n';

      scss += '\t&:after{\n';
      scss += '\t\tborder-color: hsla(hue($arrow_color), saturation($arrow_color), lightness($arrow_color), 0);\n'
      scss += '\t\tborder-' + iPos + '-color: $arrow_color;\n';
      scss += '\t\tborder-width: $arrow_size;\n';
      if (pos === 'top' || pos === 'bottom') {
        scss += '\t\tleft: 50%;\n\t\tmargin-left: -$arrow_size;\n';
      }
      else {
        scss += '\t\ttop: 50%;\n\t\tmargin-top: -$arrow_size;\n';
      }
      scss += '\t}\n';


      scss += '\t&:before{\n';
      scss += '\t\tborder-color: hsla(hue($arrow_border_color), saturation($arrow_border_color), lightness($arrow_border_color), 0);\n'
      scss += '\t\tborder-' + iPos + '-color: $arrow_border_color;\n';
      scss += '\t\tborder-width: ($arrow_size + round($arrow_border_width * 1.41421356));\n';
      if (pos === 'top' || pos === 'bottom') {
        scss += '\t\tleft: 50%;\n\t\tmargin-left: -($arrow_size + round($arrow_border_width * 1.41421356));\n';
      }
      else {
        scss += '\t\ttop: 50%;\n\t\tmargin-top: -($arrow_size + round($arrow_border_width * 1.41421356));\n';
      }
      scss += '\t}\n';

      scss += '}\n';

      return scss;
    },

    /**
    @method toSCSS
    @description returns a SCSS representation of the arrow
    @returns {String} scss
    **/
    toSCSS: function() {
      return this._baseSCSS();
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
    size:         30,
    color:        '#88b7d5',
    borderWidth:  4,
    borderColor:  '#c2e1f5'
  };

  // Expose
  G.Arrow = Arrow;

}(window.CSSArrowPlease));
