import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom'
import MonkeyQuiz from './monkeyQuiz/MonkeyQuiz';
import MathQuiz from './mathQuiz/MathQuiz';

const Header = () => (
  <header>
    <h1><Link to='/'>Home</Link></h1>
    <nav>
      <ul>
        <li><Link to='/monkey'>🐵 Quiz</Link></li>
        <li><Link to='/math'>🔢 Quiz</Link></li>
      </ul>
    </nav>
  </header>
)

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' />
      <Route exact path='/monkey' component={MonkeyQuiz} />
      <Route exact path='/math' component={MathQuiz} />
    </Switch>
  </main>
)

class MainMonkeyQuiz extends Component {
	render() {
		return (<div>
			<Header /> { /* Create links to navigate between routes */ }
			<Main /> { /* Render the component based on route */ }
		</div>
		);
	}
}

export default MainMonkeyQuiz;