import React from 'react';
import ReactDOM from 'react-dom';

import 'tailwindcss/tailwind.css';

import App from './App';
import { MagicProvider } from './context/magic';

ReactDOM.render(
  <React.StrictMode>
    <MagicProvider>
      <App />
    </MagicProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
