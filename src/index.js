import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { RootStore } from './model/RootStore';
import { setupWorker } from 'msw';
import { handlers } from './mocks/handlers';

// Comment this out to run development with real endpoint
if (process.env.NODE_ENV === 'development') {
  const worker = setupWorker(...handlers);
  worker.start();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/star-wars-planets">
      <App store={RootStore.create({})} />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
