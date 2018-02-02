import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainApp from './MainApp';
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
		<BrowserRouter>
			<MainApp />
		</BrowserRouter>
	), document.getElementById('root'));
registerServiceWorker();
