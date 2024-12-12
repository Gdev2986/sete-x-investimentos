import ReactDOM from 'react-dom';
import React from 'react';
import './i18n';

import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { configureStore } from './redux/store';

// Solução temporária para ignorar erros do ResizeObserver
const resizeObserverError = () => {
    window.addEventListener('error', (e) => {
        if (e.message === 'ResizeObserver loop limit exceeded') {
            e.stopImmediatePropagation();
        }
    });
};

resizeObserverError();

ReactDOM.render(
    <Provider store={configureStore({})}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
