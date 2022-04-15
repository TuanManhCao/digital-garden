import path from 'path'
import {Node} from "./node"
import {Transformer} from "./transformer";
import unified from "unified";
import markdown from "remark-parse";
import {toString} from 'mdast-util-to-string'

export function getContent(filename) {
    let {currentFilePath} = getFileNames(filename);
    //console.log("currentFilePath: ", currentFilePath)
    if (currentFilePath === undefined || currentFilePath == null) return null
    return Node.readFileSync(currentFilePath)
}

export function getShortSummary(filename) {
    const content = getContent(filename)
    if (content === undefined || content === null) {
        return
    }

    const tree = unified().use(markdown)
        .parse(content)
    let plainText = toString(tree)
    return plainText.split(" ").splice(0, 40).join(" ")
}


const dirTree = require("directory-tree");
const postsDirectory = path.join(process.cwd(), 'posts')

export function getAllFileNames() {
    return Node.getFiles(postsDirectory).map(f => Transformer.parseFileNameFromPath(f))
}

export function getFileNames(filename) {
    let filePaths = Node.getFiles(postsDirectory);
    const fileNames = filePaths.map(f => Transformer.parseFileNameFromPath(f))
    //console.log("\t filenames: ",fileNames, "\n")

    // IF filename is not sidebar.md THEN Exclude sidebar.md from file list
    let currentFilePath;
    if (filename === "sidebar") {
        //console.log(111)
        currentFilePath = path.join(postsDirectory, "/sidebar.md")
    } else if (filename === "index") {
        //console.log(222)
        currentFilePath = path.join(postsDirectory, "/index.md")
    } else {
        //TODO remove reference to index/sidebar md
        filePaths = filePaths.filter(f => !(f.endsWith("sidebar.md") && f.endsWith("index.md")))
        //console.log("\tDirectory is scanning to find corresponding filename")
        currentFilePath = Transformer.pairCurrentFile(filename, filePaths)
        //console.log("\tScan is finished. Founded filepath", currentFilePath, "\n")
    }
    return {fileNames, currentFilePath};
}

export function getSinglePost(filename) {
    console.log("\n\nFile is scanning: ", filename)

    // List of filenames that will provide existing links to wikilink
    let {fileNames, currentFilePath} = getFileNames(filename);
    //console.log("currentFilePath: ", currentFilePath)

    var fileContent = Node.readFileSync(currentFilePath)

    const currentFileFrontMatter = Transformer.getFrontMatterData(fileContent)

    const [htmlContent] = Transformer.getHtmlContent(fileContent, {
        fileNames: fileNames,
    })
    //console.log("hrmlcontents and backlinks")
    return {
        id: filename,
        ...currentFileFrontMatter,
        data: htmlContent,
    }

}

export function constructBackLinks() {

    const filePaths = getContentPaths()
    const edges = []
    const nodes = []

    filePaths.forEach(filename => {
            const {currentFilePath, fileNames} = getFileNames(filename)
            const internalLinks = Transformer.getInternalLinks(currentFilePath)
            internalLinks.forEach(aLink => {

                if (aLink.slug === null || aLink.slug.length === 0) return

                const anEdge = {
                    source: filename,
                    target: aLink.slug,
                }
                edges.push(anEdge)
                if (nodes.findIndex(aNode => aNode.slug === aLink.slug) === -1) {
                    aLink.shortSummary = getShortSummary(aLink.slug)
                    console.log(aLink.shortSummary)
                    nodes.push(aLink)
                }
            })
        }
    )

    return {nodes, edges};
}


export function getGraphData(currentNodeId) {

    const {nodes, edges} = constructBackLinks()

    const newNodes = nodes.map(aNode => (
        {
            data: {
                id: aNode.slug.toString(),
                label: aNode.slug.toString(),
                type: "ip"
            }
        }
    ))

    const newEdges = edges.map(anEdge => ({
        data: {
            source: anEdge.source,
            target: anEdge.target,
            // label: anEdge.source + " => " + anEdge.target
        }
    }))



    const existingNodeIDs = newNodes.map(aNode => aNode.data.id)
    if (currentNodeId != null && existingNodeIDs.includes(currentNodeId)) {
        const localNodeIDs = newEdges
            .filter(anEdge => anEdge.data.source === currentNodeId)
            .map(anEdge => anEdge.data.target)

        localNodeIDs.push(currentNodeId)

        const localNodes = newNodes.filter(aNode => localNodeIDs.includes(aNode.data.id))
        const localEdges = newEdges.filter(edge => localNodeIDs.includes(edge.data.source)).filter(edge => localNodeIDs.includes(edge.data.target))

        return {
            nodes: localNodes,
            edges: localEdges
        }
    } else {
        const filteredEdges = newEdges
            .filter(edge => existingNodeIDs.includes(edge.data.source))
            .filter(edge => existingNodeIDs.includes(edge.data.target))

        return {
            nodes: newNodes,
            edges: filteredEdges
        }
    }


}

export function getContentPaths() {
    //console.log("\n\nAll Posts are scanning")
    // Get file names under /posts
    const filePaths = Node.getFiles(postsDirectory).filter(f => !(f.endsWith("index") || f.endsWith("sidebar")))
    return filePaths.map(f => Transformer.parseFileNameFromPath(f))
}

export function getDirectoryData() {
    const filteredDirectory = dirTree(postsDirectory, {extensions: /\.md/});
    return convertObject(filteredDirectory)
}

let _counter = 0;

export function convertObject(thisObject) {
    const children = []

    let routerPath = getContentPaths().find(fileName => fileName === Transformer.normalizeFileName(thisObject.name)) || null
    routerPath = routerPath ? '/note/' + routerPath : null
    const newObject = {
        name: thisObject.name,
        children: children,
        id: (_counter++).toString(),
        routePath: routerPath || null
    };

    if (thisObject.children != null && thisObject.children.length > 0) {
        thisObject.children.forEach(aChild => {
            const newChild = convertObject(aChild)
            children.push(newChild)
        })
        return newObject;
    } else {
        return newObject
    }
}

function flat(array) {
    var result = [];
    array.forEach(function (a) {
        result.push(a);
        if (Array.isArray(a.children)) {
            result = result.concat(flat(a.children));
        }
    });
    return result;
}

export function getFlattenArray(thisObject) {
    return flat(thisObject.children)
}