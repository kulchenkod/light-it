import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from "./store/store";
import App from './App';
import "./config/axios";
import * as serviceWorker from './serviceWorker';
import '@fortawesome/fontawesome-free/css/all.css';
import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

serviceWorker.unregister();
