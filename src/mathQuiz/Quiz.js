import React from 'react';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import AnswerForm from './AnswerForm';
import QuizTimer from './QuizTimer';

function Quiz(props) {

  function renderAnswerBox() {
    return (
      <AnswerForm handleSubmit={props.onAnswer} handleChange={props.onChange} value={props.value}/>
    );
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
        <div>{props.numCorrect} correct</div>
        <Question content={props.question} />
        {renderAnswerBox()}
        <QuizTimer start={props.start} />
      </div>
    </ReactCSSTransitionGroup>
  );
}

export default Quiz;