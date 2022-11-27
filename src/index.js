import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import registerServiceWorker from './registerServiceWorker';
import Controller from './screens/Controller';
import Header from './common/header/Header';
import Home from './screens/home/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(<Header />, document.getElementById('root'));
//ReactDOM.render(<Controller />, document.getElementById('root'));
registerServiceWorker();
