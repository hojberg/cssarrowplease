/** @jsx React.DOM */

var ArrowBox = require('./arrow_box');

var Header = React.createClass({
  render: function() {
    return (
      <header className='main-header'>
        <h1>
          <span>I would love a</span>
          <span className='logo'>CSS Arrow Please</span>
          <span>By</span> <a href='http://icreateui.com'>Simon Højberg</a>
        </h1>

        <ArrowBox/>

        <h2>
          <div className='content'>
            <div className='config'>Config</div><div className='code'>Code</div>
          </div>
        </h2>
      </header>
    )
  }
});

module.exports = Header;
