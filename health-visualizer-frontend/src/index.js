import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import './assets/stylesheets/index.css';
import App from './components/App';
import { listStates } from "./actions/index"
import store from "./store/index"

// window.store = store;
// window.listStates = listStates;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
