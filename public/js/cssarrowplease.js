;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
@class Arrow
@constructor
**/
var Arrow = function () {
  this._createAttrs();
};

Arrow.prototype = {
  /**
  returns the opposite of the position
  so 'top' becomes 'bottom' and 'left' becomes 'right'
  @method invertedPosition
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
  returns an rgb color from an hex color

  @method hexToRGB
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
  generates the base css

  @method _baseCSS
  @returns {String} css
  @protected
  **/
  _baseCSS: function () {
    var pos         = this.get('position'),
        iPos        = this.invertedPosition(),
        color       = this.get('color'),
        borderSize = this.get('borderSize'),
        borderColor = this.get('borderColor'),
        hasBorder   = borderSize > 0,
        css         = '.with-arrow {\n';

    css += '\tposition: relative;\n';
    css += '\tbackground: ' + color + ';\n';

    if (hasBorder) css += '\tborder: ' + borderSize + 'px solid ' + borderColor + ';\n';

    css += '}\n';
    css += '.with-arrow:after';

    if (hasBorder)  css += ', .with-arrow:before {\n';
    else            css += ' {\n';

    css += '\t' + iPos +': 100%;\n';

    if (pos === 'top' || pos === 'bottom') {
      css += '\tleft: 50%;\n';
    }
    else {
      css += '\ttop: 50%;\n';
    }

    css += '\tborder: solid transparent;\n';
    css += '\tcontent: " ";\n';
    css += '\theight: 0;\n';
    css += '\twidth: 0;\n';
    css += '\tposition: absolute;\n';
    css += '\tpointer-events: none;\n';

    if(hasBorder) css += '}\n';

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
    var pos         = this.get('position'),
        iPos        = this.invertedPosition(),
        rgbColor    = this.hexToRGB(color),
        borderSize = this.get('borderSize'),
        css         = "";

    layer = layer || 'after';

    if(borderSize > 0) css += '.with-arrow:' + layer + ' {\n';

    css += '\tborder-color: rgba(' + rgbColor.join(', ') + ', 0);\n';
    css += '\tborder-' + iPos + '-color: ' + color + ';\n';
    css += '\tborder-width: ' + size + 'px;\n';

    if (pos === 'top' || pos === 'bottom') {
      css += '\tmargin-left: -' + size + 'px;\n';
    }
    else {
      css += '\tmargin-top: -' + size + 'px;\n';
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
        borderSize = this.get('borderSize');

    if (borderSize > 0) {
      css = this._arrowCSS(
        this.get('borderColor'),
        this.get('size') + Math.round(borderSize * 1.41421356), // cos(PI/4) * 2
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

    return css.join(css[2] ? '\n':'');
  },

  /**
  @method _createAttrs
  @description creates attributes from the ATTR constant
  @protected
  **/
  _createAttrs: function () {
    var ATTRS       = Arrow.ATTRS,
        attributes  = {};

    for (var attr in ATTRS) {
      if (ATTRS.hasOwnProperty(attr)) {
        attributes[attr] = ATTRS[attr];
      }
    };

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
  },

  setAttrs: function (attrs) {
    for (var attr in attrs) {
      if (attrs.hasOwnProperty(attr)) {
        this.set(attr, attrs[attr]);
      }
    }
  }

};

Arrow.ATTRS = {
  position:   'top',
  size:       16,
  color:      '#88b7d5',
  borderSize: 3,
  borderColor:'#c2e1f5'
};

// TODO: refactor!!
var arrowGenerator = function (config) {
  var arrow = new Arrow();
  arrow.setAttrs(config);
  return arrow.toCSS();
};

module.exports = arrowGenerator;

},{}],2:[function(require,module,exports){
/** @jsx React.DOM */

var ArrowBox = React.createClass({displayName: 'ArrowBox',
  render: function () {
    return (
      React.DOM.div( {className:"with-arrow"}, 
        " Generate tooltips with a",React.DOM.br(null ),
        " CSS triangle in any direction.",React.DOM.br(null ),
        " Configure below "
      )
    );
  }
});

module.exports = ArrowBox;

},{}],3:[function(require,module,exports){
/** @jsx React.DOM */

var ConfigLabels = require('./config_labels'),
    ConfigForm = require('./config_form'),
    GeneratedCode = require('./generated_code'),
    arrowGenerator = require('../arrow_generator');

var Config = React.createClass({displayName: 'Config',

  /**
  @method getInitialState
  @return {Object}
  **/
  getInitialState: function () {
    return {
      generatedCode: arrowGenerator(this.props.config)
    };
  },

  /**
  @method render
  @return {ReactComponent}
  **/
  render: function() {
    return (
      React.DOM.div( {className:"content"}, 
        ConfigLabels(null ),
        ConfigForm( {onConfigChange:this.handleConfigChange, config:this.props.config}),
        GeneratedCode( {code:this.state.generatedCode})
      )
    );
  },

  /**
  @method handleConfigChange
  @param {Object} config
  **/
  handleConfigChange: function (config) {
    this.setState({ generatedCode: arrowGenerator(config) });
  }
});

module.exports = Config;

},{"../arrow_generator":1,"./config_form":4,"./config_labels":5,"./generated_code":6}],4:[function(require,module,exports){
/** @jsx React.DOM */

var ConfigForm = React.createClass({displayName: 'ConfigForm',

  propTypes: {
    onConfigChange: React.PropTypes.func.isRequired
  },

  /**
  @method getInitialState
  @return {Object}
  **/
  getInitialState: function () {
    return this.props.config;
  },

  /**
  @method render
  @return {ReactComponent}
  **/
  render: function () {
    var change = function (propName) {
      return this.handleChange.bind(this, propName);
    }.bind(this);

    var isPositionChecked = function (pos) {
      return this.state.position === pos;
    }.bind(this);

    return (
      React.DOM.form( {className:"config"}, 
        React.DOM.ol(null, 
          React.DOM.li(null, 
            React.DOM.input( {type:"radio", value:"top", name:"position", onChange:change('position'), checked:isPositionChecked('top')})
          ),
          React.DOM.li(null, 
            React.DOM.input( {type:"radio", value:"right", name:"position", onChange:change('position'), checked:isPositionChecked('right')} )
          ),
          React.DOM.li(null, 
            React.DOM.input( {type:"radio", value:"bottom", name:"position", onChange:change('position'), checked:isPositionChecked('bottom')} )
          ),
          React.DOM.li(null, 
            React.DOM.input( {type:"radio", value:"left", name:"position", onChange:change('position'), checked:isPositionChecked('left')} )
          ),
          React.DOM.li( {className:"with-input"}, 
            React.DOM.input( {type:"text", onChange:change('size'), value:this.state.size} )
          ),
          React.DOM.li( {className:"with-input"}, 
            React.DOM.input( {type:"text", onChange:change('color'), value:this.state.color} )
          ),
          React.DOM.li( {className:"with-input"}, 
            React.DOM.input( {type:"text", onChange:change('borderSize'), value:this.state.borderSize} )
          ),
          React.DOM.li( {className:"with-input"}, 
            React.DOM.input( {type:"text", onChange:change('borderColor'), value:this.state.borderColor} )
          )
        )
      )
    );
  },

  handleChange: function (propName, ev) {
    var nextState = {},
        val = ev.target.value;

    if (val && propName.indexOf('ize') !== -1) {
      val = parseInt(val, 10);
    }

    nextState[propName] = val;

    this.setState(nextState, function () {
      this.props.onConfigChange(this.state);
    }.bind(this));
  }
});

module.exports = ConfigForm;

},{}],5:[function(require,module,exports){
/** @jsx React.DOM */

var ConfigLabels = React.createClass({displayName: 'ConfigLabels',
  render: function() {
    return (
      React.DOM.aside( {className:"config-labels"}, 
        React.DOM.ol(null, 
          React.DOM.li(null, "Top"),
          React.DOM.li(null, "Right"),
          React.DOM.li(null, "Bottom"),
          React.DOM.li(null, "Left"),
          React.DOM.li( {className:"for-input"}, "Size"),
          React.DOM.li( {className:"for-input"}, "Color"),
          React.DOM.li( {className:"for-input"}, "Border width"),
          React.DOM.li( {className:"for-input"}, "Border color")
        )
      )
    );
  }
});
module.exports = ConfigLabels;

},{}],6:[function(require,module,exports){
/** @jsx React.DOM */

var GeneratedCode = React.createClass({displayName: 'GeneratedCode',

  propTypes: {
    code: React.PropTypes.string.isRequired
  },

  render: function() {
    this.updateStyles();

    return (
      React.DOM.pre( {className:"generated-code code"}, 
        this.props.code
      )
    );
  },

  componentWillMount: function () {
    this.styleContainer = document.createElement('style');
    document.getElementsByTagName('body')[0].appendChild(this.styleContainer);
  },

  updateStyles: function () {
    this.styleContainer.innerText = this.props.code;
  }

});
module.exports = GeneratedCode;

},{}],7:[function(require,module,exports){
/** @jsx React.DOM */

var ArrowBox = require('./arrow_box');

var Header = React.createClass({displayName: 'Header',
  render: function() {
    return (
      React.DOM.header( {className:"main-header"}, 
        React.DOM.h1(null, 
          React.DOM.span(null, "I would love a"),
          React.DOM.span( {className:"logo"}, "CSS Arrow Please"),
          React.DOM.span(null, "By"), React.DOM.a( {href:"http://icreateui.com"}, "Simon Højberg")
        ),

        ArrowBox(null),

        React.DOM.h2(null, 
          React.DOM.div( {className:"content"}, 
            React.DOM.div( {className:"config"}, "Config"),React.DOM.div( {className:"code"}, "Code")
          )
        )
      )
    )
  }
});

module.exports = Header;

},{"./arrow_box":2}],8:[function(require,module,exports){
/** @jsx React.DOM */

var Header = require('./header'),
    Config = require('./config');

var Page = React.createClass({displayName: 'Page',
  render: function () {

    // default arrow
    var config = {
      position: 'top',
      size: 16,
      color: '#FFFFFF',
      borderSize: 3,
      borderColor: '#42474E'
    };

    return (
      React.DOM.div( {className:"page"}, 
        Header(null),
        React.DOM.main( {className:"main-content content"}, 
          Config( {config:config}),

          React.DOM.aside( {className:"who"}, 
            React.DOM.a( {href:"https://twitter.com/share", className:"twitter-share-button", 'data-url':"http://cssarrowplease.com", 'data-text':"Simple way to create CSS arrows for tooltips and the like", 'data-via':"shojberg"}, "Tweet"),
            React.DOM.div(null, "By ", React.DOM.a( {href:"http://icreateui.com"}, "Simon Højberg")),
            React.DOM.div(null, "View on ", React.DOM.a( {href:"https://github.com/hojberg"}, "GitHub"))
          )
        )
      )
    );
  }
});

module.exports = Page;

},{"./config":3,"./header":7}],9:[function(require,module,exports){
/** @jsx React.DOM */

var Page = require('./components/page');

React.renderComponent(
  Page(null),
  document.querySelector('.app')
);

},{"./components/page":8}]},{},[9])
;