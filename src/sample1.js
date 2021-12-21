import React from 'react';
import ReactDOM from 'react-dom';

import { Chart } from 'regraph';

export default function ItemGallery() {
  const nodeColor = 'rgb(241, 93, 91)';

  const labelStyle = {
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'rgb(202, 209, 216)',
    center: false,
  };

  const linkStyle = {
    color: 'rgb(221, 60, 60)',
    width: 4,
  };

  const items = {
    bordered: {
      color: nodeColor,
      label: {
        ...labelStyle,
        text: 'bordered',
      },
      border: { color: 'rgb(221, 60, 60)' },
    },
    enlarged: {
      color: nodeColor,
      label: {
        ...labelStyle,
        text: 'enlarged',
      },
      size: 1.5,
    },
    image: {
      color: nodeColor,
      label: {
        ...labelStyle,
        text: 'Image',
      },
      shape: 'box',
      image: '/img/rg-logo-square.png',
      border: { color: 'rgb(221, 60, 60)' },
    },
    link1: {
      ...linkStyle,
      id1: 'bordered',
      id2: 'enlarged',
    },
    link2: {
      ...linkStyle,
      id1: 'enlarged',
      id2: 'image',
      end1: {
        arrow: true,
      },
    },
    link3: {
      ...linkStyle,
      id1: 'enlarged',
      id2: 'image',
      end2: {
        arrow: true,
      },
      width: 1,
    },
  };

  const positions = {
    bordered: {
      x: -120,
      y: 0,
    },
    enlarged: {
      x: 0,
      y: 0,
    },
    image: {
      x: 120,
      y: 0,
    },
  };

  const settings = {
    options: {
      navigation: false,
      overview: false,
      backgroundColor: 'rgba(0,0,0,0)',
    },
    onWheel: ({ preventDefault }) => {
      preventDefault();
    },
  };

  return <Chart items={items} positions={positions} {...settings} />;
}

ReactDOM.render(<ItemGallery />, root);