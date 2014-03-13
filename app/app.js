/** @jsx React.DOM */

var Page = require('./components/page');

var App = function (props) {
  this.container = props.container;
};

App.prototype = {
  run: function () {
    React.renderComponent(
      <Page/>,
      this.container
    );
  }
};

module.exports = App;
