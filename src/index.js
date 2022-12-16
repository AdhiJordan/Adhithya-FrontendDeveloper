import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import Navigation from './Routes/index.js';
import reportWebVitals from './reportWebVitals';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

const { store, persistor } = configureStore();

const root = ReactDOM.createRoot(document.getElementById('root'));

if (typeof window !== 'undefined') {
    if (!sessionStorage.length) {
        // Ask other tabs for session storage
        sessionStorage.setItem('getSessionStorage', String(Date.now()));
    }

    window.addEventListener('storage', (event) => {
        if (event.key === 'getSessionStorage') {
            // Some tab asked for the sessionStorage -> send it
            sessionStorage.setItem(
                'sessionStorage',
                JSON.stringify(sessionStorage)
            );
            sessionStorage.removeItem('sessionStorage');
        } else if (event.key === 'sessionStorage' && !sessionStorage.length) {
            // sessionStorage is empty -> fill it
            const data = JSON.parse(event.newValue);
            for (let key in data) {
                sessionStorage.setItem(key, data[key]);
            }
        }
    });
}

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Navigation />
        </PersistGate>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
