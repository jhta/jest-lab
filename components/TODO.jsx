import React from 'react/addons';

const TODO = React.createClass({
  getInitialState() {
    return {
      items: [],
    };
  },
  onSubmit(e) {
    e.preventDefault();
    const textItem = this.refs.item.getDOMNode().value.trim();
    const isEmpty = (textItem.length === 0);
    console.log("is empty", isEmpty)
    this.refs.item.getDOMNode().value = '';
    const item = {
      text: textItem,
    }
    const {items} = this.state;
    if (!isEmpty) {
      items.push(item);
      this.setState({items});
    }
  },
  renderList() {
    return this.state.items.map((item) => {
      return (<li className="TODO-Item">{item.text}</li>);
    });
  },
  render() {
    const list = this.renderList();
    return (
        <div className="TODO">
          <form className="TODO-Form" onSubmit={this.onSubmit}>
            <input type="text" ref="item" placeholder="Crear una tarea"/>
          </form>
          <ul className="TODO-List">
            {list}
          </ul>
        </div>
    );
  },
});
export default TODO;
