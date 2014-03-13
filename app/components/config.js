/** @jsx React.DOM */

var ConfigLabels = require('./config_labels'),
    ConfigForm = require('./config_form'),
    GeneratedCode = require('./generated_code'),
    arrowGenerator = require('../arrow_generator');

var Config = React.createClass({

  /**
  @method getInitialState
  @return {Object}
  **/
  getInitialState: function () {
    return {
      generatedCode: arrowGenerator(this.props.config)
    };
  },

  /**
  @method render
  @return {ReactComponent}
  **/
  render: function() {
    return (
      <div className='content'>
        <ConfigLabels />
        <ConfigForm onConfigChange={this.handleConfigChange} config={this.props.config}/>
        <GeneratedCode code={this.state.generatedCode}/>
      </div>
    );
  },

  /**
  @method handleConfigChange
  @param {Object} config
  **/
  handleConfigChange: function (config) {
    this.setState({ generatedCode: arrowGenerator(config) });
  }
});

module.exports = Config;
