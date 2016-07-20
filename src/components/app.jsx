/* @flow */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Position} from '../model/Position';
import {Completion} from '../model/Completion';
import CompletionComponent from './completion';

class App extends Component {
  props: {
    showCompletions: Boolean,
    completionPosition: Position,
    completions: [Completion]
  };

  render() {
    const {showCompletions, completionPosition, completions} = this.props;

    if (!completions) {
      return <div>No completions... </div>
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
          {completions.map((c) => {
            const completionText = c.completion;
            return <CompletionComponent
                key={completionText}
                completion={completionText}/>
          })}
        </div>
    );
  }
}

export default connect(
    ({showCompletions, completionPosition, completions}) => {
      return {
        showCompletions,
        completionPosition,
        completions: completions.relevant
      }
    }
)(App);
