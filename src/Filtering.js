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


function getIntersections(idCliente) {
  
  let color;

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
        intersectionTable[0] = 1
      }
      if (d.Grano == 'SORGO') {
        intersectionTable[1] = 1
      }
      if (d.Grano == 'TRIGO') {
        intersectionTable[2] = 1
      }
      if (d.Grano == 'MAIZ') {
        intersectionTable[3] = 1
      }
      if (d.Grano == 'GIRASOL') {
        intersectionTable[4] = 1
      }
    }
  });

  if (
    intersectionTable[0] == 1 &&
    intersectionTable[1] == 0 &&
    intersectionTable[2] == 1 &&
    intersectionTable[3] == 1 &&
    intersectionTable[4] == 0) {
    color = 'business'
  } else {
    color = 'disk'
  }

  return color
}

function data() {
  const styles = createStyles().node;
  const nodeColorsDone = mapValues(rawData(), (value) => {
    if (value.type && styles[value.type]) {
      return { ...value, ...styles[value.type] };
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
      donut: {
        segments: [
          {
            color: createStyles().node.disk.color,
            size: 1,
          },
          {
            color: createStyles().node.disk.color,
            size: 1,
          },
          {
            color: createStyles().node.disk.color,
            size: 1,
          },
        ],
      },


      type: 'disk'

    },
    2: {
      label: {
        text: 'MAIZ', color: "#000000", backgroundColor: "#ffffff"
      },
      donut: {
        segments: [
          {
            color: createStyles().node.business.color,
            size: 1,
          },
          {
            color: createStyles().node.business.color,
            size: 1,
          },
          {
            color: createStyles().node.business.color,
            size: 1,
          },
        ],
      },
      type: 'business'
    },
    3: {
      label: {
        text: 'GIRASOL', color: "#000000", backgroundColor: "#ffffff"
      },
      donut: {
        segments: [
          {
            color: createStyles().node.switch.color,
            size: 1,
          },
          {
            color: createStyles().node.switch.color,
            size: 1,
          },
          {
            color: createStyles().node.switch.color,
            size: 1,
          },
        ],
      },
      type: 'switch'
    },
    4: {
      label: {
        text: 'SORGO', color: "#000000", backgroundColor: "#ffffff"
      },
      type: 'san',
      donut: {
        segments: [
          {
            size: 1,
            color: createStyles().node.san.color
          },
          {
            size: 1,
            color: createStyles().node.san.color
          },
          {
            size: 1,
            color: createStyles().node.san.color
          },
        ],
      },

    },
    5: {
      label: {
        text: 'TRIGO', color: "#000000", backgroundColor: "#ffffff"
      },
      donut: {
        border: {
          width: 2,
        },
        segments: [
          {
            color: createStyles().node.server.color,
            size: 1,
          },
          {
            color: createStyles().node.server.color,
            size: 1,
          },
          {
            color: createStyles().node.server.color,
            size: 1,
          },
        ],
      },
      type: 'server'
    },
  }

  //console.log("--datalength-->", Object.keys(rData).length);


  dataJSON.map((data) => {

    // let width = 1;
    // console.log("--Precio--", data.Precio);
    // if (data.Precio <= 3000) {
    //   console.log("--3000--");
    //   width = 1;
    // } else {
    //   if (data.Precio <= 6000) {
    //     console.log("--6000--");
    //     width = 2;
    //   } else {
    //     if (data.Precio <= 9000) {
    //       console.log("--9000--");
    //       width = 3;
    //     } else {
    //       if (data.Precio <= 12000) {
    //         console.log("--12000--");
    //         width = 4;
    //       } else {
    //         if (data.Precio <= 15000) {
    //           console.log("--15000--");
    //           width = 5;
    //         } else {
    //           if (data.Precio <= 18000) {
    //             console.log("--18000--");
    //             width = 6;
    //           } else {
    //             if (data.Precio <= 21000) {
    //               console.log("--21000--");
    //               width = 7;
    //             } else {
    //               if (data.Precio <= 24000) {
    //                 console.log("--24000--");
    //                 width = 8;
    //               } else {
    //                 if (data.Precio <= 27000) {
    //                   console.log("--27000--");
    //                   width = 9;
    //                 } else {
    //                   console.log("--30000--")
    //                   width = 10;
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }

    let colorClientNode = getIntersections(data.ID_Cliente);


    switch (data.Grano) {
      case "SOJA":

        //nodo de cliente
        rData[data.ID_Cliente] = {
          label: {
            text: `Cliente\n${data.ID_Cliente}`
          },
          type: colorClientNode
        }

        //linea de union
        rData[`${data.ID_Cliente}-1`] = {
          id1: data.ID_Cliente,
          id2: '1',
          end1: { arrow: false },
          end2: { arrow: false },
          color: "#77FF33",
        }

        break;
      case "MAIZ":
        rData[data.ID_Cliente] = {
          label: {
            text: `Cliente\n${data.ID_Cliente}`
          },
          type: colorClientNode
        }


        rData[`${data.ID_Cliente}-2`] = {
          id1: data.ID_Cliente,
          id2: '2',
          end1: { arrow: false },
          end2: { arrow: false },
          color: "#F6FF33",
        }

        break;

      case "GIRASOL":
        rData[data.ID_Cliente] = {
          label: {
            text: `Cliente\n${data.ID_Cliente}`,
          },
          type: colorClientNode
        }

        rData[`${data.ID_Cliente}-3`] = {
          id1: data.ID_Cliente,
          id2: '3',
          end1: { arrow: false },
          end2: { arrow: false },
          color: "#FF3333",
        }
        break;


      case "SORGO":
        rData[data.ID_Cliente] = {
          label: {
            text: `Cliente\n${data.ID_Cliente}`
          },
          type: colorClientNode
        }

        rData[`${data.ID_Cliente}-4`] = {
          id1: data.ID_Cliente,
          id2: '4',
          end1: { arrow: false },
          end2: { arrow: false },
          color: "#335BFF",
        }
        break;
      case "TRIGO":
        rData[data.ID_Cliente] = {
          label: {
            text: `Cliente\n${data.ID_Cliente}`
          },
          type: colorClientNode
        }

        rData[`${data.ID_Cliente}-5`] = {
          id1: data.ID_Cliente,
          id2: '5',
          end1: { arrow: false },
          end2: { arrow: false },
          color: "#F633FF"
        }
        break;
    }
  });


  console.log("--rData-->", rData);

  return rData;
}


function createStyles() {
  return {
    node: {
      business: {
        color: "#FFB433",
      },
      service: {
        color: "#FF33F5",
      },
      virtual: {
        color: "#048170",
      },
      server: {
        color: "#FF33F5",
      },
      switch: {
        color: "#5AFF33",
      },
      san: {
        color: "#338DFF",
      },
      disk: {
        color: "#00423e",
      },
    },
  };
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

    if (newSelection) {
      if (!isEmpty(newSelection)) {
        const id = Object.keys(newSelection)[0];
        if (isNode(allItems[id])) {
          const subGraph = await findSubGraph(id);
          setState(() => {
            return {
              items: subGraph, // replace items with just the subGraph
              layout: {
                name: 'sequential',
                top: id,
                orientation: 'right',
                curvedLinks: true,
                stretch: 3,
                tightness: 9,
              },
              positions: {}, // force the new layout to run
              selection: newSelection,
            };
          });
        }
      } else {
        setState(() => {
          return {
            items: allItems,
            layout: { curvedLinks: false },
            positions: savedPositions.current,
            selection: newSelection,
          };
        });
      }
    }
  };


  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Chart
        options={{ fit: "all" }}
        items={state.items}
        positions={state.positions}
        selection={state.selection}
        layout={state.layout}
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
