import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { GraphTarget } from './Filtering';

ReactDOM.render(
  <React.StrictMode>
    <readData />
    <div style={{ height: '700px', position: 'relative' }}>
      <GraphTarget />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
