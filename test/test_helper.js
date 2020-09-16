// dom setup
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

global.window = new JSDOM("").window;
const $ = require("jquery");
global.$ = $(window);
