var React = require('react/addons');
var CheckboxWithLabel = React.createClass({
  render() {
    return (
        <div>
          <p>hola</p>
          <ul>
            <li>uno</li>
            <li>dos</li>
          </ul>
          <div className="Text">
            {this.props.text}
          </div>
        </div>
    );
  }
});
export default CheckboxWithLabel;