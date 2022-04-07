import path from 'path'
import {Node} from "./node"
import {Transformer} from "./transformer";

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
    //console.log("\tFounded front matter data: ", currentFileFrontMatter, "\n")
    // fileContent = Transformer.preprocessThreeDashes(fileContent)
    //fileContent = fileContent.split("---").join("")
    //console.log("filecontent end")

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

    filePaths.forEach( filename => {
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
                    nodes.push(aLink)
                }
            })
        }
    )

    return {nodes, edges};
}


export function getGraphData() {
    const backlinkData = constructBackLinks()

    const elements = []

    // First create Nodes
    backlinkData.forEach(el => {
            const node = {data: {id: el.id}};

            if (el.title) {
                node.data.title = el.title
            }
            if (el.description) {
                node.data.description = el.description
            }
            elements.push(node)
        }
    )


    // Second create Edges
    backlinkData.forEach(el => {
        // check if has any internal link
        if (el.to.length > 0) {
            // create edge from  element to its links
            el.to.forEach(linkElement => {
                const edge = {
                    data: {
                        id: `${el.id}-${linkElement}`,
                        source: el.id,
                        target: linkElement
                    }
                }
                elements.push(edge)
            })
        }
    })

    return elements
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