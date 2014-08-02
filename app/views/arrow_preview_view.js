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
  @description renders the css to style the preview
  @chainable
  **/
  render: function () {
    this.container.text( this.model.toCSS() );
    return this;
  }

};

module.exports = ArrowPreviewView;
