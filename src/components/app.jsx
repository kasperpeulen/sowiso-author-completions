import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Position} from '../model/Position';
import {Completion} from '../model/Completion';

export default class App extends Component {
  props: {
    showCompletions: Boolean,
    completionPosition: Position,
    allCompletions: [Completion]
  };

  render() {
    const {showCompletions, completionPosition, allCompletions} = this.props;

    if (!allCompletions) {
      return <div>Loading ...</div>
    }
    return (
        <div style={{
        display: showCompletions ? 'block' : 'none',
        position: 'absolute',
        ...completionPosition.px,

        // TODO: remove, this is for debugging
        border: '1px solid black',
        backgroundColor: 'white',
      }}>
          {allCompletions.map((c) => {
            const completionText = c.completion;
            return <div key={completionText}>{completionText}</div>;
          })
          }
        </div>
    );
  }
}

export default connect(
    ({showCompletions, completionPosition, allCompletions}) => {
      return {
        showCompletions,
        completionPosition,
        allCompletions
      }
    }
)(App);
