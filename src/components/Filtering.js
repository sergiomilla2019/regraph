import React, { useState, useRef, useEffect } from 'react';
import { Chart, FontLoader } from 'regraph';
import isEmpty from 'lodash/isEmpty';
import has from 'lodash/has';
import mapValues from 'lodash/mapValues';
import _ from 'lodash';
import { getGraphData } from '../services/graphTargetService'
import { getSizeByQuantity, getColorIntersections, hasNodeIntersection, getQuantity } from '../helpers/graphTargetHelper';
import { neighbors } from 'regraph/analysis';

export const GraphTarget = () => <Filtering items={data()} />;

//API RESPONSE
let response = getGraphData().data

let multipleIntersections = []

function data() {
  const nodeColorsDone = mapValues(rawData(), (value) => {
    return value;
  });
  return nodeColorsDone;
}

function rawData() {

  //Product mapping
  let rData = {}
  for (let i = 0; i < response.productsGroup.length; i++) {
    rData['main-' + i] = {
      label: {
        text: response.productsGroup[i].group_sku, color: "#000000", backgroundColor: "grey"
      },
      "glyphs": [
        {
          "position": "se",
          "size": 1,
          "color": "#FFA500",
          "label": {
            "text": getQuantity(response.productsGroup[i].group_sku, response)
          }
        }
      ],
      table: {
        name: response.productsGroup[i].group_sku,
        amount: response.productsGroup[i].total_amount,
        units: response.productsGroup[i].total_units
      },
      border: {
        "color": "black",
        "width": 2
      },
      color: 'grey',
      size: getSizeByQuantity(response.productsGroup[i].group_sku, response)
    }
  }

  //Target mapping
  response.transactions.map((data) => {
    let color = getColorIntersections(data.target_id, response, multipleIntersections);

    for (let i = 0; i < response.productsGroup.length; i++) {
      if (response.productsGroup[i].group_sku == data.name) {
        rData[data.target_id] = {
          label: {
            text: `Target\n${data.target_id}`, backgroundColor: color
          },

          color: color
        }

        rData[`${data.target_id}-${'main-' + i}`] = {
          id1: data.target_id,
          id2: 'main-' + i,
          end1: { arrow: true },
          end2: { arrow: false },
          color: color,
          width: 2,
        }
      }
    }
  });

  console.log(rData)

  return rData;
}

function firstKey(record) {
  if (record == null) {
    return null;
  }
  const keys = Object.keys(record);
  return keys[0];
}

function isNode(item) {
  return item && item.id1 == null && item.id2 == null;
}

function Filtering(props) {
  // the full unfiltered data
  const { items } = props;
  // items to be shown by ReGraph
  const [state, setState] = useState({
    foreground: {}, layout: { tightness: 3 },
    positions: {},
    selection: {},
    zoom: 1,
    offset: { x: 0, y: 0 },
    annotationPosition: null,
    isDragging: false,
  });
  const chartRef = useRef();

  //Communities ----->
  const styledItems = (selectedItemId) => {
    let values;

    if (selectedItemId === undefined) {
      return items;
    }


    if (items[selectedItemId].color !== 'grey') {
      values = mapValues(items, (item, id) =>
      ({
        ...item,
        fade: !hasNodeIntersection(selectedItemId, id, items) && items[selectedItemId].color !== item.color
      }));
    } else {
      // getNeighbours().then(function(foreground){
      values = mapValues(items, (item, id) =>
      ({
        ...item,
        fade: false
      }));
      // })
    }
    return values
  };

  // remove the annotation if the window changes size
  useEffect(() => {
    const handleResize = () => {
      setState((current) => {
        if (firstKey(current.selection) == null) {
          return current;
        }

        return {
          ...current,
          selection: {},
        };
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const onChangeHandler = ({ positions: newPositions, selection: newSelection }) => {
    console.log()
    if ((newPositions == null && newSelection == null)) {
      return;
    }

    const chart = chartRef.current;
    if (chart == null) {
      return;
    }
    setState((current) => {
      const nextPositions = newPositions || current.positions;
      let nextSelection = current.selection;
      let nextAnnotationPosition = current.annotationPosition;

      if (newSelection) {
        const selectedItemId = firstKey(newSelection);
        if (selectedItemId != null) {
          const selectedItem = items[selectedItemId];
          if (isNode(selectedItem)) {
            nextSelection = { [selectedItemId]: true };
            nextAnnotationPosition = chart.viewCoordinates(
              nextPositions[selectedItemId].x,
              nextPositions[selectedItemId].y,
            );
          }
        } else {
          nextSelection = {};
        }
      } else if (current.annotationPosition == null && nextPositions != null) {
        const firstItemId = firstKey(items);
        nextAnnotationPosition = chart.viewCoordinates(
          nextPositions[firstItemId].x,
          nextPositions[firstItemId].y,
        );
        nextSelection = { [firstItemId]: true };
      }

      return {
        ...current,
        annotationPosition: nextAnnotationPosition,
        selection: nextSelection,
        positions: nextPositions,
      };
    });
  };



  const onDragHandler = ({ type, x, y, draggedItems }) => {
    if (type !== 'node' || firstKey(draggedItems) !== firstKey(state.selection)) {
      return;
    }
    // if dragging the selected node the position isn't updated until the
    // onChange event, so calculate it from the cursor
    setState((current) => {
      return {
        ...current,
        isDragging: true,
        annotationPosition: {
          x: x - current.offset.x,
          y: y - current.offset.y,
        },
      };
    });
  };


  const onDragEndHandler = ({ defaultPrevented }) => {
    setState((current) => {
      const chart = chartRef.current;
      const selectedItemId = firstKey(current.selection);
      if (
        !defaultPrevented ||
        chart == null ||
        selectedItemId == null ||
        current.positions[selectedItemId] == null
      ) {
        return { ...current, isDragging: false };
      }

      const annotationPosition = chart.viewCoordinates(
        current.positions[selectedItemId].x,
        current.positions[selectedItemId].y,
      );

      return {
        ...current,
        isDragging: false,
        annotationPosition,
      };
    });
  };


  const onPointerDownHandler = ({ id, x, y }) => {
    const item = items[id];
    const chart = chartRef.current;
    if (id == null || !isNode(item) || chart == null) {
      return;
    }

    setState((current) => {
      const position = chart.viewCoordinates(current.positions[id].x, current.positions[id].y);
      const offset = {
        x: x - position.x,
        y: y - position.y,
      };

      return {
        ...current,
        offset,
      };
    });
  };


  const onViewChangeHandler = ({ zoom }) => {
    const chart = chartRef.current;
    if (chart == null) {
      return;
    }

    const selectedItemId = firstKey(state.selection);
    if (
      state.zoom === zoom &&
      (selectedItemId == null || state.positions[selectedItemId] == null)
    ) {
      return;
    }

    setState((current) => {
      let { annotationPosition } = current;
      if (selectedItemId != null && current.positions[selectedItemId] != null) {
        annotationPosition = chart.viewCoordinates(
          current.positions[selectedItemId].x,
          current.positions[selectedItemId].y,
        );
      }

      return {
        ...current,
        zoom,
        annotationPosition,
      };
    });
  };

  const onWheelHandler = ({ preventDefault }) => {
    if (state.isDragging) {
      preventDefault();
    }
  };

  const selectedItemId = firstKey(state.selection);


  return (
    <div
      className="chart-wrapper"
      style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}
    >
      <Chart
        ref={chartRef}
        items={styledItems(selectedItemId)}
        selection={state.selection}
        animation={{ animate: false }}
        onChange={onChangeHandler}
        onDrag={onDragHandler}
        onDragEnd={onDragEndHandler}
        onPointerDown={onPointerDownHandler}
        onViewChange={onViewChangeHandler}
        onWheel={onWheelHandler}
        layout={state.layout}
        options={{ fit: "all" }}
      />
      {selectedItemId != null && state.annotationPosition != null && items[selectedItemId].color === 'grey' && (
        <Annotation
          position={state.annotationPosition}
          info={items[selectedItemId].table}
          size={items[selectedItemId].size}
          zoom={state.zoom}
        />
      )}
    </div>
  );
}

function Annotation({ position, info, zoom, size = 1 }) {
  const style = {
    top: `${position.y - 70}px`,
    left: `${position.x + (20 + size * zoom * 30)}px`,
  };
  return (
    <div className="annotation" style={style}>
      <div className="annotation-arrow" />
      <div className="annotation-header">{info.name}</div>
      <AnnotationRow title="• Total amount:" content={info.amount} />
      <AnnotationRow title="• Total units:" content={info.units} />
    </div>
  );
}

function AnnotationRow({ title, content }) {
  return (
    <div className="annotation-row">
      <div className="annotation-column">{title}</div>
      <div>{content}</div>
    </div>
  );
}
