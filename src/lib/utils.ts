import { Node } from "./node";
import { Transformer } from "./transformer";
import unified from "unified";
import markdown from "remark-parse";
import { toString } from "mdast-util-to-string";
import path from "path";
import fs from "fs";
import directoryTree, { DirectoryTree } from "directory-tree";

export function getContent(slug): string | null {
  const currentFilePath = toFilePath(slug);
  if (currentFilePath === undefined || currentFilePath == null) return null;
  return Node.readFileSync(currentFilePath);
}

export function getShortSummary(slug): string {
  const content = getContent(slug);
  if (content === null) {
    return "";
  }

  const tree = unified().use(markdown).parse(content);
  const plainText = toString(tree);
  return plainText.split(" ").splice(0, 40).join(" ");
}

export function getAllMarkdownFiles(): string[] {
  return Node.getFiles(Node.getMarkdownFolder());
}

export interface Content {
  id: string;
  title: string;
  data: string[];
}

export function getSinglePost(slug): Content {
  // List of filenames that will provide existing links to wikilink
  const currentFilePath = toFilePath(slug);
  // console.log("currentFilePath: ", currentFilePath)

  const splitPath = currentFilePath.split("/") ?? [];
  const fileNameWithExtension = splitPath.length !== 0 ? splitPath[splitPath.length - 1] : "";
  const splitedFileName = fileNameWithExtension.split(".");
  splitedFileName.pop();
  const fileName = splitedFileName.join();
  const fileContent = Node.readFileSync(currentFilePath);

  // console.log("===============\n\nFile is scanning: ", slug)
  const htmlContent = Transformer.getHtmlContent(fileContent);
  // console.log("==================================")
  // console.log("hrmlcontents and backlinks")
  return {
    id: slug,
    title: fileName,
    // ...currentFileFrontMatter,
    data: htmlContent,
  };
}

const cachedSlugMap = getSlugHashMap();

export function toFilePath(slug): string {
  return cachedSlugMap[slug];
}

interface SlugMap extends Map<string, string> {
  index: string;
}

export function getSlugHashMap(): Map<string, string> {
  // This is to solve problem of converting between slug and filepath,
  // where previously if I convert a slug to a file path sometime
  // it does not always resolve to correct filepath, converting function is not bi-directional
  // and not conflict-free, other solution was considered (hash file name into a hash, but this
  // is not SEO-friendly and make url look ugly ==> I chose this

  const slugMap = new Map<string, string>() as SlugMap;
  getAllMarkdownFiles().forEach((aFile) => {
    const aSlug = toSlug(aFile);
    // if (slugMap.has(aSlug)) {
    //     slugMap[aSlug].push(aFile)
    // } else {
    //     slugMap[aSlug] = [aFile]
    // }
    // Note: [Future improvement] Resolve conflict
    slugMap[aSlug] = aFile;
  });

  slugMap.index = Node.getMarkdownFolder() + "/index.md";
  slugMap["/"] = Node.getMarkdownFolder() + "/index.md";

  return slugMap;
}

export function toSlug(filePath: string): string {
  if (Node.isFile(filePath) && filePath.includes(Node.getMarkdownFolder())) {
    return filePath
      .replace(Node.getMarkdownFolder(), "")
      .replaceAll("/", "__")
      .replaceAll(" ", "++++")
      .replaceAll("&", "ambersand")
      .replace(".md", "");
  } else {
    // TODO handle this properly
    return "/";
  }
}

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

export function constructGraphData(): GraphData {
  const filepath = path.join(process.cwd(), "graph-data.json");
  if (Node.isFile(filepath)) {
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
    return data;
  }
}

export interface LocalGraphData {
  nodes: NodeData[];
  edges: EdgeData[];
}

export interface NodeData {
  data: {
    id: string;
    label: string | null;
  };
}

export interface EdgeData {
  data: {
    source: string;
    target: string;
  };
}

export function getLocalGraphData(currentNodeId): LocalGraphData {
  const { nodes, edges } = constructGraphData();

  const newNodes: NodeData[] = nodes.map((aNode) => ({
    data: {
      id: aNode.slug.toString(),
      label: Transformer.parseFileNameFromPath(toFilePath(aNode.slug)),
    },
  }));

  const newEdges: EdgeData[] = edges.map((anEdge) => ({
    data: {
      source: anEdge.source,
      target: anEdge.target,
    },
  }));

  const existingNodeIDs = newNodes.map((aNode) => aNode.data.id);
  currentNodeId = currentNodeId === "index" ? "__index" : currentNodeId;
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

export function getAllSlugs(): string[] {
  // console.log("\n\nAll Posts are scanning")
  // Get file names under /posts
  const filePaths = Node.getFiles(Node.getMarkdownFolder()).filter(
    (f) => !(f.endsWith("index") || f.endsWith("sidebar")),
  );
  return filePaths.map((f) => toSlug(f));
}

export function getDirectoryData(): MdObject {
  const filteredDirectory = directoryTree(Node.getMarkdownFolder(), {
    extensions: /\.md/,
  });
  return convertObject(filteredDirectory);
}

export interface MdObject {
  name: string;
  children: MdObject[];
  id: string;
  routePath: string | null;
}

export function convertObject(thisObject: DirectoryTree): MdObject {
  const children: MdObject[] = [];

  const objectName = thisObject.name;
  let routerPath: string | null =
    getAllSlugs().find((slug) => {
      const fileName = Transformer.parseFileNameFromPath(toFilePath(slug));
      return Transformer.normalizeFileName(fileName) === Transformer.normalizeFileName(objectName);
    }) ?? "";

  const nameAndExtension = objectName.split(".");
  routerPath = nameAndExtension.length > 1 && routerPath !== "" ? "/note/" + routerPath : null;
  const newObject: MdObject = {
    name: objectName,
    children,
    id: objectName,
    routePath: routerPath,
  };

  if (thisObject.children != null && thisObject.children.length > 0) {
    thisObject.children.forEach((aChild) => {
      const newChild = convertObject(aChild);
      children.push(newChild);
    });
    return newObject;
  } else {
    return newObject;
  }
}

function flat(array: MdObject[]): MdObject[] {
  let result: MdObject[] = [];
  array.forEach(function (a) {
    result.push(a);
    if (Array.isArray(a.children)) {
      result = result.concat(flat(a.children));
    }
  });
  return result;
}

export function getFlattenArray(thisObject: MdObject): MdObject[] {
  return flat(thisObject.children);
}
