/** @jsx React.DOM */

var Header = require('./header'),
    Config = require('./config');

var Page = React.createClass({
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
      <div className='page'>
        <Header/>
        <main className='main-content content'>
          <Config config={config}/>

          <aside className='who'>
            <a href="https://twitter.com/share" className="twitter-share-button" data-url="http://cssarrowplease.com" data-text="Simple way to create CSS arrows for tooltips and the like" data-via="shojberg">Tweet</a>
            <div>By <a href='http://icreateui.com'>Simon Højberg</a></div>
            <div>View on <a href='https://github.com/hojberg'>GitHub</a></div>
          </aside>
        </main>
      </div>
    );
  }
});

module.exports = Page;
