import React, { Component } from 'react';
import logo from './MathLogo.svg';
import '../css/Quiz.css';
import Quiz from './Quiz';
import Result from '../components/Result';
import update from 'react-addons-update';

class MathQuiz extends Component {
  constructor(props) {
    super(props);
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleRestartClicked = this.handleRestartClicked.bind(this);
  }

  componentWillMount() {
    this.resetState();
  }

  setNextQuestion(isCorrect) {
    const counter = this.state.counter + 1;
    this.setState({
      counter: counter,
      numCorrect: isCorrect ? this.state.numCorrect + 1 : this.state.numCorrect,
      question: this.state.questions[counter].question
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
  }

  precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
  }

  setResults() {
    const percentage = this.precisionRound(this.state.numCorrect / this.state.numQuestions, 2);
    const report = `Score: ${percentage} (${this.state.numCorrect}/${this.state.numQuestions})`;
    this.setState({ result: report });
  }

  handleAnswerSelected(event) {
    // const isCorrect = Math.pow(event.currentTarget.value, 2) === this.state.questions[this.state.counter];

    // if (this.state.counter < this.state.numQuestions) {
    //     setTimeout(() => this.setNextQuestion(isCorrect), 300);
    //   } else {
    //     setTimeout(() => this.setResults(), 300);
    //   }
    if (event.key === 'Enter') {
      alert(event.value);
    }
  }

  handleRestartClicked(element) {
    this.resetState();
  }

  resetState() {
    const numQuestions = 10;
    const max = 100;
    const targetNums = Array(numQuestions).fill().map(() => Math.floor(Math.random() * max));

    this.setState({
     counter: 0,
     numCorrect: 0,
     numQuestions: numQuestions,
     questions: [],
     result: '',
     questions: targetNums
    });

  }

  renderQuiz() {
    return (
      <Quiz
        questionId={this.state.counter}
        question={this.state.questions[this.state.counter]}
        questionTotal={this.state.numQuestions}
        onAnswer={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return (
      <div>
        <Result 
          quizResult={this.state.result} 
          onRestartClicked={this.handleRestartClicked}
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
