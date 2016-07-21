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
    completions: [Completion],
    selectedCompletionIndex: number
  };

  render() {
    const {showCompletions, completionPosition, completions, selectedCompletionIndex} = this.props;

    if (completions.length == 0) {
      return null;
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
            const index = completions.lastIndexOf(c);
            const selected = selectedCompletionIndex == index;
            return <CompletionComponent
                key={completionText}
                selected={selected}
                completion={completionText}
            />
          })}
        </div>
    );
  }
}

export default connect(
    ({
        showCompletions,
        completionPosition,
        completions,
        selectedCompletionIndex
    }) => {
      return {
        showCompletions,
        completionPosition,
        completions: completions.relevant,
        selectedCompletionIndex
      }
    }
)(App);
