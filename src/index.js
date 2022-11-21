import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import './i18n';
import moment from 'moment';
import { localeData } from 'moment_spanish_locale';

import reducers from './reducers';

import App from './App';
import './index.css'; 

moment.locale('es', localeData);
moment.locale('en');

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const rootNode = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootNode  
);