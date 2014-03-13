/** @jsx React.DOM */

var ConfigLabels = React.createClass({
  render: function() {
    return (
      <aside className='config-labels'>
        <ol>
          <li>Top</li>
          <li>Right</li>
          <li>Bottom</li>
          <li>Left</li>
          <li className='for-input'>Size</li>
          <li className='for-input'>Color</li>
          <li className='for-input'>Border width</li>
          <li className='for-input'>Border color</li>
        </ol>
      </aside>
    );
  }
});
module.exports = ConfigLabels;
