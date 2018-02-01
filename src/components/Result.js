import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {AwesomeButton} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import './Result.css';

function Result(props) {
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
        <div className="forAwesomeButton">
          You prefer <strong>{props.quizResult}</strong>!
        </div>
        <div className="forAwesomeButton">
          <AwesomeButton action={props.onRestartClicked}>Play again!</AwesomeButton>
        </div>
      </div>
    </ReactCSSTransitionGroup>
  );
}

export default Result;