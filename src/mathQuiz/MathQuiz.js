import React, { Component } from 'react';
import logo from './MathLogo.svg';
import '../css/Quiz.css';
import Quiz from './Quiz';
import MathResult from './MathResult';
import update from 'react-addons-update';

const quizParams = {
  numQuestions: 10,
  max: 100
}

class MathQuiz extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRestartClicked = this.handleRestartClicked.bind(this);
  }

  componentWillMount() {
    this.resetState();
  }

  setNextQuestion(isCorrect) {
    const counter = this.state.counter + 1;
    this.setState({
      counter: counter,
      question: this.state.questions[counter].question,
      numCorrect: isCorrect ? this.state.numCorrect + 1 : this.state.numCorrect,
      currentValue: ''
    });
  }

  precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }

  setResults(isCorrect) {
    const percentage = this.precisionRound(this.state.numCorrect * 100 / this.state.numQuestions, 1);
    const duration = this.precisionRound(this.getDuration() / 1000, 2);
    this.setState({ 
      result: true,
      numCorrect: isCorrect ? this.state.numCorrect + 1 : this.state.numCorrect,
      duration: duration
    });
  }

  handleSubmit(event) {
    const userAnswer = this.state.currentValue;
    const isCorrect = Math.pow(this.state.questions[this.state.counter], 2) === parseInt(userAnswer);

    if (this.state.counter + 1 < this.state.numQuestions) {
      setTimeout(() => this.setNextQuestion(isCorrect), 100);
    } else {
      setTimeout(() => this.setResults(isCorrect), 100);
    }
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({currentValue: event.target.value});
  }

  handleRestartClicked() {
    this.resetState();
  }

  getDuration() {
    return (new Date()).getTime() - this.state.startTime;
  }

  resetState() {
    const targetNums = Array(quizParams.numQuestions).fill().map(() => Math.floor(Math.random() * quizParams.max) + 1);

    this.setState({
     counter: 0,
     numCorrect: 0,
     numQuestions: quizParams.numQuestions,
     questions: [],
     result: '',
     questions: targetNums,
     currentValue: '',
     startTime: Date.now(),
     duration: ''
    });

  }

  renderQuiz() {
    return (
      <Quiz
        questionId={this.state.counter}
        question={this.state.questions[this.state.counter]}
        questionTotal={this.state.numQuestions}
        onAnswer={this.handleSubmit}
        onChange={this.handleChange}
        value={this.state.currentValue}
        numCorrect={this.state.numCorrect}
        start={this.state.startTime}
      />
    );
  }

  renderResult() {
    return (
      <div>
        <MathResult
          duration={this.state.duration}
          numCorrect={this.state.numCorrect}
          numQuestions={this.state.numQuestions} 
          onRestartClicked={this.handleRestartClicked}
          roundFunc={this.precisionRound}
        />
      </div>
    );
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Math Quiz</h2>
          <br/>
        </div>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    )
  }
}

export default MathQuiz;
