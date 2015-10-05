import React from 'react/addons';

const TODO = React.createClass({
  propType: {
    defaultText: React.PropTypes.string,
  },
  getDefaultProps() {
    return {
      defaultText: "task",
    };
  },
  getInitialState() {
    return {
      items: [],
      defaultText: this.props.defaultText,
    };
  },
  onKeyDown(e) {
    e.preventDefault();
    if (e.keyCode == 13) {
      const textItem = this.refs.item.getDOMNode().value.trim();
      const isEmpty = (textItem.length === 0);
      //this.refs.item.getDOMNode().value = '';
      const item = {
        text: textItem,
      };
      const {items} = this.state;
      if (!isEmpty) {
        items.push(item);
        this.setState({items});
      }
    }
  },
  onChange(e) {
    e.preventDefault();
    this.setState({
      defaultText: this.refs.item.getDOMNode().value.trim(),
    });
  },
  onDeleteItem(itemText) {
    const items = this.state.items.filter((item) => item.text != itemText);
    this.setState({items});
  },
  renderList() {
    return this.state.items.map((item, index) => {
      return (
        <li
          className="TODO-Item"
          key={index}>
          <span
            className="TODO-ItemDeleteIcon"
            onClick={() => {this.onDeleteItem(item.text)}}
            >
             x
          </span>
          {item.text}
        </li>);
    });
  },
  render() {
    const list = this.renderList();
    return (
        <div className="TODO">
          <form className="TODO-Form">
            <input
              type="text"
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
              value={this.state.defaultText}
              ref="item"
            />
            <button type="button" onClick={this.onClick}> enviar</button>
          </form>
          <ul className="TODO-List">
            {list}
          </ul>
        </div>
    );
  },
});
export default TODO;
