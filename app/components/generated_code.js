/** @jsx React.DOM */

var GeneratedCode = React.createClass({

  propTypes: {
    code: React.PropTypes.string.isRequired
  },

  render: function() {
    this.updateStyles();

    return (
      <pre className='generated-code code'>
        {this.props.code}
      </pre>
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
