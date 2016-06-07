import React, { Component } from 'react';

class Panel extends Component {
  render() {
    return (
      <div>
        <h1>Hello {this.props.name} - from inside Panel</h1>
      </div>
    );
  }
}

export default Panel;
