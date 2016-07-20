import React, {Component} from 'react';
import {connect} from 'react-redux';

export default class App extends Component {
  props:{
    showCompletions: Boolean
  };

  render() {
    const {showCompletions} = this.props;
    return (
        <div style={{
        display: showCompletions ? 'block' : 'none',
        position: 'absolute',

        // TODO: remove, this is for debugging
        border: '1px solid black',
        backgroundColor: 'white',
        top: '100px',
        left: '100px'
      }}>
          Here will be completions. At some point...
        </div>
    );
  }
}

export default connect(
    ({showCompletions}) => {
      return {
        showCompletions
      }
    }
)(App);
