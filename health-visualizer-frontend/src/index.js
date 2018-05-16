import React from 'react';
import ReactDOM from 'react-dom';
import './assets/stylesheets/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'

window.store = store;
window.addArticle = addArticle;

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();
