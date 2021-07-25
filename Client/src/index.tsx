import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './Routes/AppRouter'
import reportWebVitals from './reportWebVitals';
import { AuthenticationProvider } from './ZeroAuthHelper/AuthenticationProvider';

ReactDOM.render(
  <AuthenticationProvider>
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>
  </AuthenticationProvider >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
