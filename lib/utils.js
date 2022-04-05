import path from 'path'
import {Node} from "./node"
import {Transformer} from "./transformer";

const dirTree = require("directory-tree");

function pathSelector(filename, allFilePaths){
    if (filename.replace(".md", "") === "index"){
        return "/index.md"
    }
    else if (filename.replace(".md", "") === "sidebar"){
        return "/sidebar.md"
    }
    return allFilePaths.filter(f => !(f.endsWith("index.md") && f.endsWith("sidebar.md")))
}


const postsDirectory = path.join(process.cwd(), 'posts')

export function getAllFileNames() {
    return Node.getFiles(postsDirectory).map(f => Transformer.parseFileNameFromPath(f))
}

export function getSinglePost(filename) {
    console.log("\n\nFile is scanning: ", filename)

    // List of filenames that will provide existing links to wikilink
	var filePaths = Node.getFiles(postsDirectory)
    const fileNames = filePaths.map(f => Transformer.parseFileNameFromPath(f))
    //console.log("\t filenames: ",fileNames, "\n")

	// IF filename is not sidebar.md THEN Exclude sidebar.md from file list
    var currentFilePath;
    if (filename === "sidebar"){
        //console.log(111)
        currentFilePath = path.join(postsDirectory, "/sidebar.md")
    }
    else if (filename === "index"){
        //console.log(222)
        currentFilePath = path.join(postsDirectory, "/index.md")
    }
    else {
        //console.log(333)
        filePaths = filePaths.filter(f => !(f.endsWith("sidebar.md") && f.endsWith("index.md")))
        //console.log("\tDirectory is scanning to find corresponding filename")
        currentFilePath = Transformer.pairCurrentFile(filename, filePaths)
        //console.log("\tScan is finished. Founded filepath", currentFilePath, "\n")
    }
    //console.log("currentFilePath: ", currentFilePath)

    var fileContent = Node.readFileSync(currentFilePath)

	const currentFileFrontMatter = Transformer.getFrontMatterData(fileContent)
	//console.log("\tFounded front matter data: ", currentFileFrontMatter, "\n")
    // fileContent = Transformer.preprocessThreeDashes(fileContent)
	//fileContent = fileContent.split("---").join("")
	//console.log("filecontent end")

	const [htmlContent, backlinks] = Transformer.getHtmlContent(fileContent, {
		fileNames:fileNames,
	})
	//console.log("hrmlcontents and backlinks")
	return {
		id:filename,
		...currentFileFrontMatter,
		data:htmlContent
	  }
	
  }

export function getAllBacklinks(){
	//console.log("\n\nBacklinks are scanning")
	//var bimap = new BiMap
	var internalLinks = []

	// Get file names under /posts
	const filePaths = Node.getFiles(postsDirectory).filter(f => !f.endsWith("sidebar.md"))
	const fileNames = filePaths.map(f => Transformer.parseFileNameFromPath(f))
	//console.log("\tFounded filePaths: ", fileNames)

	var allBacklinkData = filePaths.map(fileName => {
			// Remove ".md" from file name to get id
            const slug = Transformer.parseFileNameFromPath(fileName)
            
            //console.log("filename", fileNames)
            const fileData = {
                id:slug
            }

			//console.log("AllBacklinks slug", slug)

			// Read markdown file as string
            var fileContent = Node.readFileSync(fileName, 'utf8')
            
            const frontmatterData = Transformer.getFrontMatterData(fileContent)
            const requiredParameters = ["title", "description"]
            requiredParameters.forEach(param => {
                if (frontmatterData[param])
                fileData[param] = frontmatterData[param]
            })

			//fileContent = fileContent.split("---").join("")			
			const [htmlContent, backlinks] = Transformer.getHtmlContent(fileContent, {
				fileNames:fileNames,
            })
            // Check if scanned slug post has any internal links
            const existingInternalLink = backlinks.filter(bl => fileNames.includes(bl))
            fileData.to = existingInternalLink
            fileData.href = slug === "index" ? "/" : `/note/${slug}`
            //console.log("\n\nbacklinks",[ slug, [backlinks]] )
            //bimap.push(slug, backlinks)
            
            // Check if internal link exists
            //const internalLinks = backlinks.filter(bl => fileNames.includes(bl))
            internalLinks.push(fileData)
            //console.log("bimap: ", bimap.key(slug))

            // Combine the data with the slug
            //return backlinkList.length > 0 ? JSON.stringify(backlinkList) : null
        })

        //console.log("founded internal links for ", internalLinks)
    //console.log("\n\ninternal list: ", internalLinks)
    return internalLinks
    //return [allBacklinkData.filter(bl => bl !== null), JSON.stringify(fileNames)]
}

export function getGraphData(){
    const backlinkData = getAllBacklinks()

    const elements = []
    
    // First create Nodes
    backlinkData.forEach(el => {
        const node = {data: {id: el.id}};

        if(el.title){
            node.data.title = el.title
        }
        if (el.description){
            node.data.description = el.description
        }
        elements.push(node)
        }
    )
    

    // Second create Edges
    backlinkData.forEach(el => {
        // check if has any internal link
        if (el.to.length > 0){
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

export function getPostListData() {
	//console.log("\n\nAll Posts are scanning")
	// Get file names under /posts
	const filePaths = Node.getFiles(postsDirectory).filter(f => !(f.endsWith("index") || f.endsWith("sidebar")))
	const fileNames = filePaths.map(f => Transformer.parseFileNameFromPath(f))
	//console.log("filePaths", filePaths)

  
  return fileNames
}

export function getDirectoryData() {
    const filteredDirectory = dirTree(postsDirectory,{ extensions: /\.md/ });
    const convertedData = convertObject(filteredDirectory)
    // console.log()
    // const array = getFlattenArray(convertedData)
    return convertedData
}
let _counter = 0;
export function convertObject(thisObject) {
    const children = []


    let routerPath = getPostListData().find(fileName => fileName === Transformer.normalizeFileName(thisObject.name) ) || null
    routerPath = routerPath ? '/note/' +routerPath : null
    const newObject = {name: thisObject.name, children: children, id: (_counter++).toString(), routePath: routerPath || null };

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

export function getFlattenArray (thisObject) {
    return flat(thisObject.children)
}