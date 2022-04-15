import React, {useEffect, useRef, useState} from 'react';
import CytoscapeComponent from "react-cytoscapejs";

const layout = {
    name: "breadthfirst",
    fit: true,
    circle: true,
    directed: true,
    padding: 50,
    spacingFactor: 1.5,
    animate: true,
    // animationDuration: 300,
    avoidOverlap: false,
    nodeDimensionsIncludeLabels: true
};

const styleSheet = [
    {
        selector: "node",
        style: {
            backgroundColor: "#4a56a6",
            width: 10,
            height: 10,
            label: "data(label)",

            // "width": "mapData(score, 0, 0.006769776522008331, 20, 60)",
            // "height": "mapData(score, 0, 0.006769776522008331, 20, 60)",
            // "text-valign": "center",
            // "text-halign": "center",
            "overlay-padding": "6px",
            "z-index": "10",
            //text props
            "text-outline-color": "#4a56a6",
            "text-outline-width": "1px",
            color: "red",
            fontSize: 20
        }
    },
    {
        selector: "node:selected",
        style: {
            "border-width": "6px",
            "border-color": "#AAD8FF",
            "border-opacity": "0.5",
            "background-color": "#77828C",
            width: 50,
            height: 50,
            //text props
            "text-outline-color": "#77828C",
            "text-outline-width": 1
        }
    },
    {
        selector: "node[type='device']",
        style: {
            shape: "square"
        }
    },
    {
        selector: "edge",
        style: {
            width: 3,
            // "line-color": "#6774cb",
            "line-color": "#AAD8FF",
            "target-arrow-color": "#6774cb",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier"
        }
    }
];



function Graph({graph}) {
    const [width, setWith] = useState("100%");
    const [height, setHeight] = useState("400px");
    const [graphData, setGraphData] = useState({
        nodes: graph.nodes,
        edges: graph.edges
    });

    let myCyRef;

    return (
        <>
            <div>
                <h3>Links to this notes</h3>
                <div
                    style={{
                        border: "1px solid",
                        backgroundColor: "#f5f6fe"
                    }}
                >
                    <CytoscapeComponent
                        elements={CytoscapeComponent.normalizeElements(graphData)}
                        // pan={{ x: 200, y: 200 }}
                        style={{ width: width, height: height }}
                        zoomingEnabled={true}
                        maxZoom={2}
                        minZoom={0.5}
                        autounselectify={false}
                        boxSelectionEnabled={true}
                        layout={layout}
                        stylesheet={styleSheet}
                        cy={cy => {
                            myCyRef = cy;

                            console.log("EVT", cy);

                            cy.on("tap", "node", evt => {
                                var node = evt.target;
                                console.log("EVT", evt);
                                console.log("TARGET", node.data());
                                console.log("TARGET TYPE", typeof node[0]);
                            });

                        }}
                    />
                </div>
            </div>
        </>
    );
}

export default Graph;