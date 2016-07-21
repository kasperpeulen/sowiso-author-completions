import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {mod} from "../helper_functions";

export class CompletionComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {completion, selected} = this.props;
    return (
        <div style={{
          // TODO: improve style
          backgroundColor: selected ? 'lightblue' : 'white'
        }}>
          {completion}
        </div>
    );
  }

  componentDidUpdate() {
    this.makeSureSelectedCompletionIsScrolledIntoView();
  }

  makeSureSelectedCompletionIsScrolledIntoView() {
    if (this.props.selected) {
      const element = ReactDOM.findDOMNode(this);
      const parent = element.parentNode;

      const offsetHeightParent = parent.offsetHeight;
      const heightElement = parseInt(getComputedStyle(element).height, 10);
      const offsetSelectedCompletion = element.offsetTop
          + heightElement
          - parent.scrollTop;

      if (offsetHeightParent < offsetSelectedCompletion ) {
        parent.scrollTop += offsetSelectedCompletion - offsetHeightParent;
      } else if (offsetSelectedCompletion < heightElement) {
        parent.scrollTop -= heightElement -offsetSelectedCompletion;
      }
    }
  }
}