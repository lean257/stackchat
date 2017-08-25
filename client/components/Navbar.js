import React, { Component } from 'react';
import NameEntry from './NameEntry'

export default class Navbar extends Component {
  render () {
    return (
      <nav>
        <h3># channelname goes here</h3>
        <h4><NameEntry messages={this.props.messages}/></h4>
      </nav>
    );
  }
}
