var $ = require('jquery');
var Arrow = require('./models/arrow');
var ArrowConfigurationView = require('./views/arrow_configuration_view');
var ArrowPreviewView = require('./views/arrow_preview_view');
var ArrowCSSView = require('./views/arrow_css_view');

/**
@class App
@constructor
@description
  Main application object.
  Acts as view dispatcher
**/
var App = function () {
  this.init.apply(this, arguments);
};

App.prototype = {

  init: function () {
    this.model = new Arrow();
    this._initViews();
  },

  /**
  @method _initViews
  @description initializes views
  @protected
  **/
  _initViews: function () {
    var model = this.model;

    this.views = [
      new ArrowConfigurationView({ model: model, container: $('.configuration') }),
      new ArrowPreviewView({ model: model, container: $('<style type="text/css"></style>').appendTo('body') }),
      new ArrowCSSView({ model: model, container: $('.css_result') }),
    ];
  },

  render: function () {
    $.each(this.views, function (i, view) {
      view.render();
    });
  }

};

new App().render();

