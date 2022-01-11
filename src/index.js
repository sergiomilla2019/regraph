import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { GraphTarget } from './components/Filtering';
import { Demo } from './components/Annotation';
import Table from './components/Table'

ReactDOM.render(
  <React.StrictMode>
    <readData />
    <div style={{ width: '1920px', height: '1080px', position: 'relative' }}>
      <GraphTarget />
      {/* <Demo/> */}
      {/* <Table data = {data}/> */}
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
