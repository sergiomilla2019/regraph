import React, { useState, useRef, useEffect } from 'react';
import { Chart, FontLoader } from 'regraph';
import { data, chartOptions } from '../data';
import '../css/Annotation.css';



export const Demo = () => <AnnotationDemo items={data} />;

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

function AnnotationDemo(props) {
  const { items } = props;
  const [state, setState] = useState({
    positions: {},
    selection: {},
    zoom: 1,
    offset: { x: 0, y: 0 },
    annotationPosition: null,
    isDragging: false,
  });
  const chartRef = useRef(null);

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
    if (newPositions == null && newSelection == null) {
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

  // store the offset to the cursor position to correct during a drag
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
      <FontLoader config={{ custom: { families: ['Font Awesome 5 Free'] } }}>
        <Chart
          ref={chartRef}
          items={items}
          selection={state.selection}
          options={chartOptions}
          animation={{ animate: false }}
          onChange={onChangeHandler}
          onDrag={onDragHandler}
          onDragEnd={onDragEndHandler}
          onPointerDown={onPointerDownHandler}
          onViewChange={onViewChangeHandler}
          onWheel={onWheelHandler}
        />
      </FontLoader>
      {selectedItemId != null && state.annotationPosition != null && (
        <Annotation
          position={state.annotationPosition}
          info={items[selectedItemId].data}
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
      <AnnotationRow title="Tel:" content={info.phone} />
      <AnnotationRow title="Email:" content={info.email} />
      <AnnotationRow title="Add:" content={info.address} />
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
