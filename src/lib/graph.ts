import { ElementDefinition } from "cytoscape";
import { Transformer } from "./transformer";
import { getShortSummary, toFilePath, toSlug } from "./slug";
import path from "path";
import { getAllMarkdownFiles, isFile } from "./io";
import fs from "fs";

interface GraphData {
  nodes: CustomNode[];
  edges: CustomEdge[];
}

interface CustomEdge {
  source: string;
  target: string;
}

export interface CustomNode {
  title: string | null;
  slug: string;
  shortSummary: string;
}

export interface LocalGraphData {
  nodes: ElementDefinition[];
  edges: ElementDefinition[];
}
export function constructGraphData(): GraphData {
  const filepath = path.join(process.cwd(), "graph-data.json");
  if (fs.existsSync(filepath) && isFile(filepath)) {
    const data = fs.readFileSync(filepath);
    return JSON.parse(String(data));
  } else {
    const filePaths = getAllMarkdownFiles();
    const edges: CustomEdge[] = [];
    const nodes: CustomNode[] = [];
    filePaths.forEach((aFilePath) => {
      // const {currentFilePath} = getFileNames(filename)
      const aNode: CustomNode = {
        title: Transformer.parseFileNameFromPath(aFilePath),
        slug: toSlug(aFilePath),
        shortSummary: getShortSummary(toSlug(aFilePath)),
      };
      nodes.push(aNode);

      // console.log("Constructing graph for node: " + aFilePath )
      const internalLinks = Transformer.getInternalLinks(aFilePath);
      internalLinks.forEach((aLink) => {
        if (aLink.slug === null || aLink.slug.length === 0) return;

        const anEdge: CustomEdge = {
          source: toSlug(aFilePath),
          target: aLink.slug,
        };
        edges.push(anEdge);
        // console.log("Source: " + anEdge.source)
        // console.log("Target: " + anEdge.target)
      });
      // console.log("==============Constructing graph" )
    });
    const data: GraphData = { nodes, edges };
    fs.writeFileSync(filepath, JSON.stringify(data), "utf-8");
    console.log("data", data);
    return data;
  }
}

export function getLocalGraphData(currentNodeId: string): LocalGraphData {
  const { nodes, edges } = constructGraphData();
  const newNodes: ElementDefinition[] = nodes.map((aNode) => ({
    data: {
      id: aNode.slug,
      label: Transformer.parseFileNameFromPath(toFilePath(aNode.slug)),
    },
  }));

  const newEdges: ElementDefinition[] = edges.map((anEdge) => ({
    data: {
      source: anEdge.source,
      target: anEdge.target,
    },
  }));

  const existingNodeIDs = newNodes.map((aNode) => aNode.data.id);
  // const firstPage = FIRST_PAGE();
  // currentNodeId = currentNodeId === firstPage ? `__${firstPage}` : currentNodeId;
  if (currentNodeId != null && existingNodeIDs.includes(currentNodeId)) {
    const outGoingNodeIds = newEdges
      .filter((anEdge) => anEdge.data.source === currentNodeId)
      .map((anEdge) => anEdge.data.target);

    const incomingNodeIds = newEdges
      .filter((anEdge) => anEdge.data.target === currentNodeId)
      .map((anEdge) => anEdge.data.source);

    outGoingNodeIds.push(currentNodeId);

    const localNodeIds = incomingNodeIds.concat(
      outGoingNodeIds.filter((item) => !incomingNodeIds.includes(item)),
    );
    if (!localNodeIds.includes(currentNodeId)) {
      localNodeIds.push(currentNodeId);
    }

    const localNodes = newNodes.filter((aNode) => localNodeIds.includes(aNode.data.id));
    let localEdges = newEdges
      .filter((edge) => localNodeIds.includes(edge.data.source))
      .filter((edge) => localNodeIds.includes(edge.data.target));

    // Filter self-reference edges
    localEdges = localEdges.filter((edge) => edge.data.source !== edge.data.target);

    // TODO: Find out why target ==='/' in some case
    localEdges = localEdges.filter((edge) => edge.data.target !== "/");
    return {
      nodes: localNodes,
      edges: localEdges,
    };
  } else {
    const filteredEdges = newEdges
      .filter((edge) => existingNodeIDs.includes(edge.data.source))
      .filter((edge) => existingNodeIDs.includes(edge.data.target));

    return {
      nodes: newNodes,
      edges: filteredEdges,
    };
  }
}
