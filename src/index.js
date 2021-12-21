import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HistogramTimeBar from './timebar';
import HistogramTimeBarSmooth from './smooth';
import { Demo } from './ChartTimeBar';
import { Demo1 } from './Filtering';
import { Demo2 } from './map';

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> 
    <HistogramTimeBar />
    <HistogramTimeBarSmooth />*/}
    <readData />
    <div style={{ height: '700px', position: 'relative' }}>
       
       
       <Demo1 />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
