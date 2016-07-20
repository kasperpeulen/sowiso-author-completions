import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Position} from '../model/Position';

export default class App extends Component {
  props: {
    showCompletions: Boolean,
    completionPosition: Position
  };

  render() {
    const {showCompletions, completionPosition} = this.props;
    return (
        <div style={{
        display: showCompletions ? 'block' : 'none',
        position: 'absolute',
        ...completionPosition.px,

        // TODO: remove, this is for debugging
        border: '1px solid black',
        backgroundColor: 'white',
      }}>
          Here will be completions. At some point...
        </div>
    );
  }
}

export default connect(
    ({showCompletions, completionPosition}) => {
      return {
        showCompletions,
        completionPosition
      }
    }
)(App);
