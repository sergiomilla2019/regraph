import React, { useState, useRef } from 'react';
import isEmpty from 'lodash/isEmpty';
import pickBy from 'lodash/pickBy';
import has from 'lodash/has';
import { neighbors } from 'regraph/analysis';

import { Chart } from 'regraph';
import { distances } from 'regraph/analysis';

import mapValues from 'lodash/mapValues';

import dataJSON from '../src/data.json';
import _ from 'lodash';




let multipleIntersections = []

function getSizeByQuantity(grano){
  let quantity = 0
  dataJSON.forEach(d => {
    if(d.Grano === grano){
      quantity ++;
    }
  })
  return 1.3 + (quantity / 1000) 
}

function getColorIntersections(idCliente) { 

  //Inicializo todas las posiciones en 0  para ver con cual intersecta el nodo
  let intersectionTable = [];
  intersectionTable.push(0);
  intersectionTable.push(0);
  intersectionTable.push(0);
  intersectionTable.push(0);
  intersectionTable.push(0);

  //Recorro la lista de clientes para ver que clientes se relacionan con que producto
  dataJSON.forEach(d => {

    //Por cada cliente prendo un nuevo producto
    if (idCliente == d.ID_Cliente) {

      if (d.Grano == 'SOJA') {
        intersectionTable[0] = 2
      }
      if (d.Grano == 'SORGO') {
        intersectionTable[1] = 4
      }
      if (d.Grano == 'TRIGO') {
        intersectionTable[2] = 8
      }
      if (d.Grano == 'MAIZ') {
        intersectionTable[3] = 16
      }
      if (d.Grano == 'GIRASOL') {
        intersectionTable[4] = 32
      }
    }
  });

  let interesectionValue = intersectionTable[0] + intersectionTable[1] + intersectionTable[2] + intersectionTable[3] + intersectionTable[4]

  if(multipleIntersections[interesectionValue] == undefined){
    multipleIntersections[interesectionValue] = '#' + Math.floor(Math.random() * 16777215).toString(16)
  }

  return  multipleIntersections[interesectionValue]

}

function data() {
  const nodeColorsDone = mapValues(rawData(), (value) => {
    if (value.type ) {
      return { ...value};
    }
    return value;
  });
  const linkStylesDone = mapValues(nodeColorsDone, (value) => {
    const { id1, id2, end1, end2 } = value;
    if (id1 && id2) {
      return {
        ...value,
        width: 4,
        end1: { ...end1, color: nodeColorsDone[value.id1].color },
        end2: { ...end2, color: nodeColorsDone[value.id2].color },
      };
    }
    return value;
  });
  return linkStylesDone;
}

function rawData() {

  //PRIMERO SE DEFINEN TODOS LOS NODOS PRINCIPALES
  let rData = {
    1: {
      label: {
        text: 'SOJA', color: "#000000", backgroundColor: "#ffffff"
      },
      border: {
        "color": "black",
        "width": 2
      },
      color: 'grey',
      size: getSizeByQuantity('SOJA')

    },
    2: {
      label: {
        text: 'MAIZ', color: "#000000", backgroundColor: "#ffffff"
      },
      border: {
        "color": "black",
        "width": 2
      },
      color: 'grey', 
      size: getSizeByQuantity('MAIZ')
    },
    3: {
      label: {
        text: 'GIRASOL', color: "#000000", backgroundColor: "#ffffff"
      },
      border: {
        "color": "black",
        "width": 2
      },
      color: 'grey',
      size: getSizeByQuantity('GIRASOL')
    },
    4: {
      label: {
        text: 'SORGO', color: "#000000", backgroundColor: "#ffffff"
      },
      border: {
        "color": "black",
        "width": 2
      },
      color: 'grey',
      size: getSizeByQuantity('SORGO')
    },
    5: {
      label: {
        text: 'TRIGO', color: "#000000", backgroundColor: "#ffffff"
      },
      border: {
        "color": "black",
        "width": 2
      },
      color: 'grey',
      size: getSizeByQuantity('TRIGO')
    },
  }

  //console.log("--datalength-->", Object.keys(rData).length);


  dataJSON.map((data) => {

    let colorClientNode = getColorIntersections(data.ID_Cliente);
   console.log(getSizeByQuantity(data.Grano))


    switch (data.Grano) {
      case "SOJA":

        //nodo de cliente
        rData[data.ID_Cliente] = {
          label: {
            text: `Cliente\n${data.ID_Cliente}`
          },
          color: colorClientNode
        }

        //linea de union
        rData[`${data.ID_Cliente}-1`] = {
          id1: data.ID_Cliente,
          id2: '1',
          end1: { arrow: false },
          end2: { arrow: false }
        }

        break;
      case "MAIZ":
        rData[data.ID_Cliente] = {
          label: {
            text: `Cliente\n${data.ID_Cliente}`
          },
          color: colorClientNode
        }


        rData[`${data.ID_Cliente}-2`] = {
          id1: data.ID_Cliente,
          id2: '2',
          end1: { arrow: false },
          end2: { arrow: false }
        }

        break;

      case "GIRASOL":
        rData[data.ID_Cliente] = {
          label: {
            text: `Cliente\n${data.ID_Cliente}`,
          },
          color: colorClientNode
        }

        rData[`${data.ID_Cliente}-3`] = {
          id1: data.ID_Cliente,
          id2: '3',
          end1: { arrow: false },
          end2: { arrow: false }
        }
        break;


      case "SORGO":
        rData[data.ID_Cliente] = {
          label: {
            text: `Cliente\n${data.ID_Cliente}`
          },
          color: colorClientNode
        }

        rData[`${data.ID_Cliente}-4`] = {
          id1: data.ID_Cliente,
          id2: '4',
          end1: { arrow: false },
          end2: { arrow: false }
        }
        break;
      case "TRIGO":
        rData[data.ID_Cliente] = {
          label: {
            text: `Cliente\n${data.ID_Cliente}`
          },
          color: colorClientNode
        }

        rData[`${data.ID_Cliente}-5`] = {
          id1: data.ID_Cliente,
          id2: '5',
          end1: { arrow: false },
          end2: { arrow: false }
        }
        break;
    }
  });

  console.log("--rData-->", rData);

  return rData;
}

export default data;

function isNode(item) {
  return !has(item, 'id1');
}

export const Demo1 = () => <Filtering items={data()} />;

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

  const findSubGraph = async (nodeId) => {
    const subGraphIds = await distances(allItems, nodeId, { direction: 'to' });

    return pickBy(allItems, (item, id) => {
      // Get the nodes present in the subgraph.
      if (has(subGraphIds, id)) {
        return true;
      }
      // Get links which have the nodes at both ends in the subgraph.
      if (!isNode(item)) {
        return has(subGraphIds, item.id1) && has(subGraphIds, item.id2);
      }
      return false;
    });
  };

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
          fixed:['center']
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

