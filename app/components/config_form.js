/** @jsx React.DOM */

var ConfigForm = React.createClass({

  propTypes: {
    onConfigChange: React.PropTypes.func.isRequired
  },

  /**
  @method getInitialState
  @return {Object}
  **/
  getInitialState: function () {
    return this.props.config;
  },

  /**
  @method render
  @return {ReactComponent}
  **/
  render: function () {
    var change = function (propName) {
      return this.handleChange.bind(this, propName);
    }.bind(this);

    var isPositionChecked = function (pos) {
      return this.state.position === pos;
    }.bind(this);

    return (
      <form className='config'>
        <ol>
          <li>
            <input type='radio' value='top' name='position' onChange={change('position')} checked={isPositionChecked('top')}/>
          </li>
          <li>
            <input type='radio' value='right' name='position' onChange={change('position')} checked={isPositionChecked('right')} />
          </li>
          <li>
            <input type='radio' value='bottom' name='position' onChange={change('position')} checked={isPositionChecked('bottom')} />
          </li>
          <li>
            <input type='radio' value='left' name='position' onChange={change('position')} checked={isPositionChecked('left')} />
          </li>
          <li className='with-input'>
            <input type='text' onChange={change('size')} value={this.state.size} />
          </li>
          <li className='with-input'>
            <input type='text' onChange={change('color')} value={this.state.color} />
          </li>
          <li className='with-input'>
            <input type='text' onChange={change('borderSize')} value={this.state.borderSize} />
          </li>
          <li className='with-input'>
            <input type='text' onChange={change('borderColor')} value={this.state.borderColor} />
          </li>
        </ol>
      </form>
    );
  },

  handleChange: function (propName, ev) {
    var nextState = {},
        val = ev.target.value;

    if (val && propName.indexOf('ize') !== -1) {
      val = parseInt(val, 10);
    }

    nextState[propName] = val;

    this.setState(nextState, function () {
      this.props.onConfigChange(this.state);
    }.bind(this));
  }
});

module.exports = ConfigForm;
