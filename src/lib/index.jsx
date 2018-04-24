import React, { Component } from "react";

class MySuperCoolComponent extends Component {
  handleClick = () => {
    console.log("Click!");
  };

  render() {
    const { color, children } = this.props;
    return (
      <button onClick={this.handleClick} style={{ color }}>
        {children}
      </button>
    );
  }
}

export default MySuperCoolComponent;
