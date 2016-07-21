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
        <div ref="root" style={{
        display: showCompletions ? 'flex' : 'none',
        flexDirection: 'row',
         maxHeight: '131px',
        borderRadius: '3px',
        boxShadow: 'rgba(0, 0, 0, 0.0980392) 0px 2px 12px',
        padding: '2px 0px',
        position: 'absolute',
        background: 'rgba(255, 255, 255, 0.901961)',
        ...completionPosition.px
      }}>
            <div style={{
              overflow: 'auto',
              minWidth: '131px'
            }}>
              {completions.map((c) => {
                const index = completions.lastIndexOf(c);
                const selected = selectedCompletionIndex == index;
                return <CompletionComponent
                    key={c.completion}
                    selected={selected}
                    completion={c.completion}
                />
              })}
            </div>
          <div style={{overflow: 'auto', width: '400px'}}>
            {this.selectedCompletionDescription()}
            </div>
        </div>
    );
  }

  selectedCompletionDescription(): string {
    return this.props.completions[this.props.selectedCompletionIndex].description;
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
