var $ = require('jquery');

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
  @chainable
  **/
  render: function () {
    this._setDefaults();
    return this;
  },

  /**
  @method _setDetaults
  @description update the view with the model defaults
  **/
  _setDefaults: function () {
    var container = this.container,
        model     = this.model;

    container.find('.position').val([ model.get('position') ]);
    container.find('.size').val( model.get('size') );
    container.find('.base_color').val( model.get('color') );
    container.find('.border_width').val( model.get('borderWidth') );
    container.find('.border_color').val( model.get('borderColor') );
  },

  /**
  @method _attachEvents
  @description attaches dom events
  @protected
  **/
  _attachEvents: function () {
    var _updateModelProxy = this._updateModel.bind(this),
        _updateInputProxy = this._updateInput.bind(this),
        container         = this.container,
        selectors         = [ { classname: '.position',      keyboard_interactive: false },
                              { classname: '.size',          keyboard_interactive: true },
                              { classname: '.base_color',    keyboard_interactive: false },
                              { classname: '.border_width',  keyboard_interactive: true },
                              { classname: '.border_color',  keyboard_interactive: false }
                            ];

    selectors.forEach(function (selector, i) {
      container.delegate(selector.classname, 'change', _updateModelProxy);
      if (selector.keyboard_interactive) {
        container.delegate(selector.classname, 'keydown', _updateInputProxy);
      }
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
    else if (target.hasClass('base_color')) {
      attr = 'color';
    }
    else {
      attr = target.attr('class');
    }

    if (attr === 'borderWidth' || attr === 'size') val = parseInt(val, 10);
    this.model.set(attr, val);
  },

  _updateInput: function (ev) {
    if (ev.keyCode != 38 && ev.keyCode != 40) return;

    var target    = $(ev.currentTarget),
        val       = parseInt(target.val()),
        increment = ev.keyCode == 38 ? 1 : -1,
        multiply  = ev.shiftKey ? 10 : 1,
        newVal    = val + increment * multiply;

    if (newVal < 0) newVal = 0;

    target.val(newVal);
    this._updateModel(ev);
  }

};

module.exports = ArrowConfigurationView;
