import Cytoscape from "cytoscape";
var nodeHtmlLabel = require('cytoscape-node-html-label');


const Graph = ({ el, graphdata, current }) => {
    nodeHtmlLabel( Cytoscape );

    var cy = Cytoscape({
        container:el,
        elements:graphdata,
        style:[{
            selector: "node",
            style:{
                "background-color" : el => el.data("id") === current ? '#5221c4' :  "#666",
                "font-size": "10px",
                "width": "20px",
                "height": "20px"
                //"label": el => el.data("id") === current ? "" : el.data('title') ? el.data("title").slice(0,16) : el.data("id")
            }
        },{
            selector: "label",
            style: {"font-size": "12px"},
        },
        {
            selector: 'edge',
            style: {
              'width': 2,
              "height":200,
              'line-color': '#5221c4',
              'target-arrow-color': '#ccc',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier'
            }
          }],
        layout: {
            name: 'circle',

            fit: true, // whether to fit the viewport to the graph
            padding: 32, // the padding on fit
            boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
            avoidOverlap: true, // prevents node overlap, may overflow boundingBox and radius if not enough space
            nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
            spacingFactor: 0.9, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
            radius: 180, // the radius of the circle
            startAngle: -2 / 4 * Math.PI, // where nodes start in radians
            //sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
            clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
            sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
            animate: false, // whether to transition the node positions
            animationDuration: 500, // duration of animation in ms if enabled
            animationEasing: undefined, // easing of animation if enabled
            //animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
            ready: undefined, // callback on layoutready
            stop: undefined, // callback on layoutstop
            transform: function (node, position ){ return position; } // transform a given node position. Useful for changing flow direction in discrete layouts 
          

        
        },
        zoom: 10,
        hideEdgesOnViewport:false,
        wheelSensitivity:0.2,
    })
    
    cy.nodeHtmlLabel( [{
        query: "node",
        halign:"top",
        valign:"center",
        cssClass: 'label',
        tpl: el => {
        //el.data("id") === current ? "" : el.data('title') ? el.data("title").slice(0,16) : el.data("id")
        const label = el.id === current ? "" : el.title ? el.title : el.id
        return  `<div title="${el.title ? el.title : el.id}" style='font-weight:400; margin-top:32px;max-width:180px;font-size:12px;color:white;cursor:pointer;'>${label}</div>`
    }}],
    {
        enablePointerEvents: true
      }
    )
    return cy
}


export const Network = ({ el, graphdata, current, router, allNodes }) => {
    var jsnx = require('jsnetworkx');

    
    //const grouper = (id) => id === "index" ? 1 : (id === "codesheet" ? 2 : 3)


    var currentnode = graphdata.filter(g => g.data.id === current)[0]
    currentnode = [currentnode.data.id, {
            label:current==="index" ? "HOME" : currentnode.data.title ? currentnode.data.title : currentnode.data.id,
            href:current==="index" ? "/" : `/note/${currentnode.data.id}`,
            //group:grouper(current)
        }];
    //var currentTargetNames = graphdata.filter(g => g.data.source === current).map(e => e.data.target)
    //var currentTargetNodes = graphdata.filter(g => currentTargetNames.includes(g.data.id))

    var othernodes, edges;
    if (allNodes){
        othernodes = graphdata.filter(g => (g.data.id !== current) && !g.data.source)
        othernodes = othernodes.map(on => [on.data.id ,{
            label:on.data.title ? on.data.title : on.data.id,
            href: on.data.id === "index" ? "/" : `/note/${on.data.id}`,
            //group: grouper(on.data.id)
            }
        ])
        //console.log(othernodes)
        edges = graphdata.filter(g => g.data.source)
        edges = edges.map(e => [e.data.source, e.data.target])
    }
    else {
        //console.log("else")
        var indexnode = graphdata.filter(g => g.data.id === "index")[0]
        indexnode = ["Home", { 
            width:30,
            height:30,
            weight:1,
            href:`/`,
            title: "Home",
            fill:"blueviolet",
            
        }]

        var currentRawEdges = graphdata.filter(g => g.data.source === current)
        edges = currentRawEdges.map(ce => [ce.data.source, ce.data.target, {weight:1 } ])

        var currentTargetNames = currentRawEdges.map(ie => ie.data.target)
        var currentTargets = graphdata.filter(g => currentTargetNames.includes(g.data.id))
        othernodes = currentTargets.map(ct => [ct.data.id, {size:6, href:`/note/${ct.data.id}`}])
        othernodes = [indexnode, ...othernodes]
    }



    var G = new jsnx.DiGraph();
    G.addNodesFrom(
        [
            currentnode,
            ...othernodes,
        ], 
        {color: '#999999', width:40, height:40}
    );
    G.addEdgesFrom(edges);

    jsnx.draw(G, {
        element: el,
        withLabels: true,
        labelStyle:{
            color:"#333",
            fill:function(n){
                return n.node === current ? "#fff" : "#000"            
            }
        },
        labelAttr:{
            class: "node-label",
            y:16,
            click:function(l){
                this.addEventListener("click", function(){
                    router.push(l.data.href)
                })
            }
        },
        layoutAttr:{
            linkDistance:160,
            charge:function(c){ return -280},
        },
        nodeStyle: {
            fill: function(d) { 
                return "#999"
                //console.log("group", d.data.group)
                //return color(d.data.group); 
            },
            stroke: 'none'
        },
        nodeAttr:{
            class: "node-node",
            click:function(l){
                this.addEventListener("click", function(){
                    console.log("lll", l.data);
                    router.push(l.data.href)
                })
            }
        },
        edgeStyle:{
            height:120
        }
    }, true);
    return G
}

export default Graph;