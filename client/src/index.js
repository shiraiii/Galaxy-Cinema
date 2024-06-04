import React from 'react';
import ReactDOM from 'react-dom/client';
import RouterCustom from './router'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import './App.js'
import { store } from './app/store.js';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <RouterCustom />    
      </BrowserRouter>
  </React.StrictMode>
);