//Time Bar

import React from 'react';
import ReactDOM from 'react-dom';

import { TimeBar } from 'regraph';

const settings = {
  options: {
    backgroundColor: 'rgb(81, 95, 108)',
    style: {
      color: 'rgb(45, 205, 168)',
      hoverColor: 'rgb(7, 156, 131)',
    },
    sliders: {
      color: 'rgba(36, 44, 50, 0.5)',
      lineColor: 'rgb(81, 95, 108)',
    },
    labels: {
      fontColor: 'rgb(123, 135, 147)',
    },
    scale: {
      hoverColor: 'rgb(81, 95, 108)',
    },
  },
  onWheel: ({ preventDefault }) => {
    preventDefault();
  },
};

export default function HistogramTimeBar() {
  return <TimeBar items={generateData()} {...settings} />;
}

// Randomly generate 200 data points
function generateData() {
  const items = {};
  for (let i = 0; i < 200; i += 1) {
    items[`dt${i}`] = {
      // Set the date to be today minus a random number of days
      times: [{ time: new Date() - 1000 * 60 * 60 * 24 * (Math.random() * 100) }],
    };
  }
  return items;
}

// ! ReactDOM.render(<HistogramTimeBar />, root);