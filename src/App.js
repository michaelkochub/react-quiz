import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Quiz from './components/Quiz';
import quizQuestions from './api/quizQuestions';
import Result from './components/Result';
import update from 'react-addons-update';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleRestartClicked = this.handleRestartClicked.bind(this);
  }

  componentWillMount() {
    this.resetState();
  }

  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  setUserAnswer(answer) {
    const updatedAnswersCount = update(this.state.answersCount, {
      [answer]: {$apply: (currentValue) => currentValue + 1}
    });
    this.setState({
      answersCount: updatedAnswersCount,
      answer: answer
    });
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: ''
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
  }

  setResults (result) {
    if (result.length > 0) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    if (this.state.questionId < quizQuestions.length) {
        setTimeout(() => this.setNextQuestion(), 300);
      } else {
        setTimeout(() => this.setResults(this.getResults()), 300);
      }
  }

  handleRestartClicked(element) {
    this.resetState();
  }

  resetState() {
    this.setState({
     counter: 0,
     questionId: 1,
     question: '',
     answerOptions: [],
     answer: '',
     answersCount: {
       Nintendo: 0,
       Microsoft: 0,
       Sony: 0
     },
     result: ''
    });

    const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));  

    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
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
          <h2>First React Quiz 🙌</h2>
          <br/>
        </div>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    )
  }
}

export default App;
