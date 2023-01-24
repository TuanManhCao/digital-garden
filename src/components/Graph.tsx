import React, { CSSProperties, useEffect, useState } from "react";
// import cytoscape from 'cytoscape';
// import cola from 'cytoscape-cola';
import { useRouter } from "next/router";

import CytoscapeComponent from "react-cytoscapejs";
import { Core } from "cytoscape";
import { LocalGraphData, MdObject } from "../lib/utils";

const layout = {
  name: "circle",
  fit: true, // whether to fit the viewport to the graph
  padding: 32, // the padding on fit
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  avoidOverlap: true, // prevents node overlap, may overflow boundingBox and radius if not enough space
  nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
  spacingFactor: 0.9, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
  radius: 150, // the radius of the circle
  startAngle: (-2 / 4) * Math.PI, // where nodes start in radians
  // sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
  clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
  sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
  animate: false, // whether to transition the node positions
  animationDuration: 500, // duration of animation in ms if enabled
  animationEasing: undefined, // easing of animation if enabled
  // animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
  ready: undefined, // callback on layoutready
  stop: undefined, // callback on layoutstop
  transform: function (node, position) {
    return position;
  }, // transform a given node position. Useful for changing flow direction in discrete layouts
};

const styleSheet = [
  {
    selector: "node",
    style: {
      "background-color": "#666",
      "font-size": "12px",
      width: "20px",
      height: "20px",
      label: "data(label)",
    },
  },
  {
    selector: "label",
    style: { "font-size": "12px" },
  },
  {
    selector: "edge",
    style: {
      width: 2,
      height: 200,
      "line-color": "#b2b2b2",
      "target-arrow-color": "#ccc",
      // 'target-arrow-shape': 'triangle',
      "curve-style": "straight",
    },
  },
];

function Graph({ graph }: {graph: LocalGraphData}): JSX.Element {
  const c: CSSProperties = { width: "300px", height: "300px" }
  const [cssProperties] = useState(c)
  const [elements, elementSetter] = useState(CytoscapeComponent.normalizeElements(graph))
  useEffect(() => {
    elementSetter(CytoscapeComponent.normalizeElements(graph))
  }, [graph])

  const router = useRouter();
  return (
    <>
      <div className="right-bar-container">
        <h3>Interactive Graph</h3>
        <div
          style={{
            border: "1px solid #ddd",
            backgroundColor: "#f5f6fe",
            borderRadius: "8px",
          }}
        >
          <CytoscapeComponent
            elements={elements}
            // pan={{ x: 200, y: 200 }}
            style={cssProperties}
            zoomingEnabled={true}
            maxZoom={2}
            minZoom={0.5}
            autounselectify={false}
            boxSelectionEnabled={true}
            layout={layout}
            stylesheet={styleSheet}
            cy={(cy) => {
              // console.log("EVT", cy);
              cy.layout(layout).run()
              cy.fit()
              cy.on("tap", "node", (evt) => {
                const node: Core = evt.target;
                const { id }: MdObject = node.data();
                const path = "/note/" + id;
                void router.push(path);
              });
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Graph;
