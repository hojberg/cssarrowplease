// dom setup
var jsdom = require('jsdom');
global.window = jsdom.jsdom().createWindow();
var $ = require('jquery');
global.$ = $(window);
