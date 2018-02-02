import React from 'react';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import AnswerOption from '../components/AnswerOption';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function Quiz(props) {

  function renderAnswerBox() {
    return (
      <input type="number" value='' autofocus="autofocus" onChange={checkAnswerBox} />
    );
  }

  function checkAnswerBox(event) {
    if (event.key === 'Enter') {
      alert(event.value);
    }
  }

  return (
    <ReactCSSTransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div key={props.questionId}>
        <QuestionCount
          counter={props.questionId + 1}
          total={props.questionTotal}
        />
        <Question content={props.question} />
        {renderAnswerBox()}
      </div>
    </ReactCSSTransitionGroup>
  );
}

export default Quiz;