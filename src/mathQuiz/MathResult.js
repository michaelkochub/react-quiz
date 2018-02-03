import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {AwesomeButton} from 'react-awesome-button';
import ReactDOM from 'react-dom';
import 'react-awesome-button/dist/styles.css';

const styles = {
  padding: '5px'
}

const VIEWER_REF = 'VIEWER';

class Result extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      this.props.onRestartClicked();
    }
    event.preventDefault();
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        className="container result"
        component="div"
        transitionName="fade"
        transitionEnterTimeout={800}
        transitionLeaveTimeout={500}
        transitionAppear
        transitionAppearTimeout={500}
      >
        <div>
          <div style={styles}>
            <strong>Time Elapsed: </strong>{this.props.duration} s
          </div>
          <div style={styles}>
            <strong>Score: </strong>{this.props.numCorrect} / {this.props.numQuestions}&nbsp;
            ({this.props.roundFunc(this.props.numCorrect * 100 / this.props.numQuestions, 1)}%)
          </div>
          <div style={styles}>
            <AwesomeButton action={this.props.onRestartClicked} ref={button => this.button = button}>Play again!</AwesomeButton>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}


export default Result;