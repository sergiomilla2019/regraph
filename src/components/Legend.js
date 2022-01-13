import React, { useState, useRef, useEffect } from 'react';
import { Chart, FontLoader } from 'regraph';
import isEmpty from 'lodash/isEmpty';
import has from 'lodash/has';
import mapValues from 'lodash/mapValues';
import _ from 'lodash';
import { getGraphData } from '../services/graphTargetService'
import { neighbors } from 'regraph/analysis';
import { getSizeByQuantity, getColorIntersections } from '../helpers/graphTargetHelper';
import { isCompositeComponent } from 'react-dom/test-utils';

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
        rData[i] = {
            label: {
                text: response.productsGroup[i].group_sku, color: "#000000", backgroundColor: "grey"
            },
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
        let colorClientNode = getColorIntersections(data.target_id, response, multipleIntersections);

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
                    end1: { arrow: true },
                    end2: { arrow: false },
                    color: colorClientNode,
                    width: 2,
                }
            }
        }
    });

    console.log(rData)

    return rData;
}



function isNode(item) {
    return item && item.id1 == null && item.id2 == null;
}

function Filtering(props) {
    const [state, setState] = useState({ foreground: {}, layout: { tightness: 3 } });
    const { items } = props;
    const chartRef = useRef();

    const chartChange = async (change) => {
        const { selection } = change;
        console.log(selection)
        if (!selection) {
                const nodesAndLinks = await neighbors(items, selection);
                setState((current) => {
                    return { ...current, foreground: { ...nodesAndLinks, ...selection } };
                });
            
        }
    };

    const styledItems = () => {
        const { foreground } = state;
        // console.log(foreground)
        
        
        let values = mapValues(items, (item, id) =>
        (
            {
            ...item,
            fade: false
        }));
        return values; 
    };

    // remove the annotation if the window changes size

    return (
        <div
            className="chart-wrapper"
            style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}
        >
            <Chart
                ref={chartRef}
                items={styledItems()}
                layout={state.layout}
                onChange={chartChange}
                selection={state.selection}
                animation={{ animate: false }}
                options={{ fit: "all" }}
            />
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
