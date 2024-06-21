import './bootstrap';
import React from 'react';
import App from './components/app';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './css/index.css';


const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <PersistGate persistor={persistor}>
                <App tab="home" />
            </PersistGate>
        </BrowserRouter>
    </Provider>
);
