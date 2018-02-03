import React, { Component } from 'react';

class QuizTimer extends Component {
	constructor(props) {
		super(props);
		this.state = {elapsed: 0};
    this.tick = this.tick.bind(this);
	}

	componentDidMount() {
		this.timer = setInterval(this.tick, 50);
	}

	componentWillUnmount() {
		clearInterval(this.timer)
	}

	tick() {
		this.setState({elapsed: new Date() - this.props.start});
	}

	render() {
		const elapsed = Math.round(this.state.elapsed / 10);
		const seconds = (elapsed / 100).toFixed(2);

		return (
			<p>Time: <b>{seconds} s</b></p>
		);
	}
} 

export default QuizTimer;