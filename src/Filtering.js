import React, { useState, useRef } from 'react';
import isEmpty from 'lodash/isEmpty';
import has from 'lodash/has';
import { Chart } from 'regraph';
import mapValues from 'lodash/mapValues';
import _ from 'lodash';
import { getGraphData } from './services/graphTargetService'

//API RESPONSE
let response = getGraphData().data

let multipleIntersections = []

function getSizeByQuantity(grain) {
  let quantity = 0
  response.transactions.forEach(t => {
    if (t.name === grain) {
      quantity++;
    }
  })
  return 2 + (quantity / 1000)
}

function getColorIntersections(target) {
  //Initialize all positions to 0 to see which node intersects with
  let intersectionTable = [];
  response.productsGroup.forEach(p => {
    intersectionTable.push(0);
  });

  //See the list of transactions to know which customers are related to which product
  let interesectionValue
  interesectionValue = 0
  response.transactions.forEach(d => {

    //For each customer I initialize a new product with the binary value (2 ^ index)
    if (target == d.target_id) {
      for (let i = 0; i < response.productsGroup.length; i++) {
        if (d.name == response.productsGroup[i].group_sku) {
          intersectionTable[i] = Math.pow(2, (i + 1))
        }
      }
      interesectionValue = intersectionTable.reduce((a, b) => a + b, 0)
    }
  });

  if (multipleIntersections[interesectionValue] == undefined) {
    multipleIntersections[interesectionValue] = rainbow((interesectionValue), Math.pow(2, intersectionTable.length)-1)
  }
  return multipleIntersections[interesectionValue]
}

 function rainbow(step, numOfSteps) {
  // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
  var r, g, b;
  var h = step / numOfSteps;
  var i = ~~(h * 6);
  var f = h * 6 - i;
  var q = 1 - f;
  switch(i % 6){
      case 0: r = 1; g = f; b = 0; break;
      case 1: r = q; g = 1; b = 0; break;
      case 2: r = 0; g = 1; b = f; break;
      case 3: r = 0; g = q; b = 1; break;
      case 4: r = f; g = 0; b = 1; break;
      case 5: r = 1; g = 0; b = q; break;
  }
  var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
  return (c);
}

function data() {
  const nodeColorsDone = mapValues(rawData(), (value) => {
    return value;
  });

  const linkStylesDone = mapValues(nodeColorsDone, (value) => {
    return value;
  });
  return linkStylesDone;
}

function rawData() {

  //Product mapping
  let rData = {}
  for (let i = 0; i < response.productsGroup.length; i++) {
    rData[i] = {
        label: {
          text: response.productsGroup[i].group_sku, color: "#000000", backgroundColor: "grey"
        },
        border: {
          "color": "black",
          "width": 2
        },
        color: 'grey',
        size: getSizeByQuantity(response.productsGroup[i].group_sku)
      }
  }

  //Target mapping
  response.transactions.map((data) => {
    let colorClientNode = getColorIntersections(data.target_id);

    for (let i = 0; i < response.productsGroup.length; i++) {
      if (response.productsGroup[i].group_sku == data.name) {
        rData[data.target_id] = {
          label: {
            text: `Target\n${data.target_id}`, backgroundColor: colorClientNode
          },
          color: colorClientNode
        }

        rData[`${data.target_id}-${i}`] = {
          id1: data.target_id,
          id2: i,
          end1: { arrow: false },
          end2: { arrow: false },
          color: colorClientNode
        }
      }
    }
  });
  
  return rData;
}

function isNode(item) {
  return !has(item, 'id1');
}

export const GraphTarget = () => <Filtering items={data()} />;

function Filtering(props) {
  // the full unfiltered data
  const { items: allItems } = props;
  // items to be shown by ReGraph
  const [state, setState] = useState({
    items: allItems,
    layout: {},
    positions: {},
    selection: {},
  });
  const savedPositions = useRef({});

  const chartChangeHandler = async ({ positions: newPositions, selection: newSelection }) => {
    // After running the initial layout, store all the
    // positions so they can be restored later.
    if (!isEmpty(newPositions) && isEmpty(savedPositions.current)) {
      savedPositions.current = { ...newPositions };
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Chart
        options={{ fit: "all" }}
        items={state.items}
        positions={state.positions}
        selection={state.selection}
        layout={{
          name: 'organic',
          fixed: ['center']
        }}
        // disable dragging of nodes
        onDragStart={({ preventDefault, type, id }) => {
          if (id && isNode(state.items[id])) {
            preventDefault();
          }
        }}
        onChange={chartChangeHandler}
        animation={{ animate: true, time: 850 }}
      />
    </div>
  );
}

