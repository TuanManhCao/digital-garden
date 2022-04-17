import path from 'path'
import {Node} from "./node"
import {Transformer} from "./transformer";
import unified from "unified";
import markdown from "remark-parse";
import {toString} from 'mdast-util-to-string'

const dirTree = require("directory-tree");
const postsDirectory = path.join(process.cwd(), 'posts')


export function getContent(slug) {
    let currentFilePath = toFilePath(slug)
    if (currentFilePath === undefined || currentFilePath == null) return null
    return Node.readFileSync(currentFilePath)
}

export function getShortSummary(slug) {
    const content = getContent(slug)
    if (content === undefined || content === null) {
        return
    }

    const tree = unified().use(markdown)
        .parse(content)
    let plainText = toString(tree)
    return plainText.split(" ").splice(0, 40).join(" ")
}


export function getAllMarkdownFiles() {
    return Node.getFiles(postsDirectory)
}
export function getSinglePost(slug) {
    console.log("\n\nFile is scanning: ", slug)

    // List of filenames that will provide existing links to wikilink
    let currentFilePath = slug !== "index" ? toFilePath(slug) : path.join(process.cwd(), 'posts') + "/index.md"
    //console.log("currentFilePath: ", currentFilePath)

    var fileContent = Node.readFileSync(currentFilePath)

    const currentFileFrontMatter = Transformer.getFrontMatterData(fileContent)

    const [htmlContent] = Transformer.getHtmlContent(fileContent)
    //console.log("hrmlcontents and backlinks")
    return {
        id: slug,
        ...currentFileFrontMatter,
        data: htmlContent,
    }

}

export function toFilePath(slug) {
    // Construct file name from slug of /notes/abcxyz
    let filePath ;

    if (slug === '/') {
        filePath =  path.join(process.cwd(), 'posts') + "/index.md"
    }  else {
        filePath = postsDirectory + slug
                .replaceAll('__','/')
                .replaceAll('--',' ')
                .replaceAll('ambersand','&')
            + ".md";
    }

    if (Node.isFile(filePath)) {
        return filePath
    } else {
        return null
    }
}


export function toSlug(filePath) {
    // Convert File Path to unique slug

    // let result = filePath.replace('/','__').replace(' ','-').replace('.md', '')

    return filePath.replace(postsDirectory, '')
        .replaceAll('/','__')
        .replaceAll(' ','--')
        .replaceAll('&','ambersand')
        .replace('.md', '')
}


export function constructBackLinks() {

    const filePaths = getAllMarkdownFiles();
    const edges = []
    const nodes = []

    filePaths.forEach(filename => {
            // const {currentFilePath} = getFileNames(filename)
            const internalLinks = Transformer.getInternalLinks(filename)
            internalLinks.forEach(aLink => {

                if (aLink.slug === null || aLink.slug.length === 0) return

                const anEdge = {
                    source: toSlug(filename),
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
                label: Transformer.parseFileNameFromPath(toFilePath(aNode.slug)),
            }
        }
    ))

    const newEdges = edges.map(anEdge => ({
        data: {
            source: anEdge.source,
            target: anEdge.target,
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

export function getAllSlugs() {
    //console.log("\n\nAll Posts are scanning")
    // Get file names under /posts
    const filePaths = Node.getFiles(postsDirectory).filter(f => !(f.endsWith("index") || f.endsWith("sidebar")))
    return filePaths.map(f => toSlug(f))
}

export function getDirectoryData() {
    const filteredDirectory = dirTree(postsDirectory, {extensions: /\.md/});
    return convertObject(filteredDirectory)
}

let _counter = 0;

export function convertObject(thisObject) {
    const children = []

    let routerPath = getAllSlugs().find(slug => {
        const fileName = Transformer.parseFileNameFromPath(toFilePath(slug))
            return Transformer.normalizeFileName(fileName) === Transformer.normalizeFileName(thisObject.name)
    }) || null
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