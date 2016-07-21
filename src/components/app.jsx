/* @flow */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Position} from '../model/Position';
import {Completion} from '../model/Completion';
import {CompletionComponent} from './completion';

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
        maxHeight: '131px',
        minWidth: '131px',
        borderRadius: '3px',
        boxShadow: 'rgba(0, 0, 0, 0.0980392) 0px 2px 12px',
        padding: '2px 0px',
        position: 'absolute',
        overflow: 'auto',
        background: 'rgba(255, 255, 255, 0.901961)',
        ...completionPosition.px
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
