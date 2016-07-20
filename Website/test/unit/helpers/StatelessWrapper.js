import React from 'react';
// Lifted from the unexpected-react documentation
export default class StatelessWrapper extends React.Component {
  render() {
    return (this.props.children);
  }
}
