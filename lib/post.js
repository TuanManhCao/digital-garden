import path from 'path'
import matter, { test } from 'gray-matter'
import fs from "fs"
import { Node } from "./node"
import { Transformer } from "./transformer";
import BiMap from "bimap";

function pathSelector(filename, allFilePaths){
    if (filename.replace(".md", "") === "index"){
        return "/index.md"
    }
    else if (filename.replace(".md", "") === "sidebar"){
        return "/sidebar.md"
    }
    const editedFilePaths = allFilePaths.filter(f => !(f.endsWith("index.md") && f.endsWith("sidebar.md") ))
    return editedFilePaths
}


const postsDirectory = path.join(process.cwd(), 'posts')

export function getSinglePost(filename) {
    //console.log("\n\nFile is scanning: ", filename)

    // List of filenames that will provide existing links to wikilink
	var filePaths = Node.getFiles(postsDirectory)
    const fileNames = filePaths.map(f => Transformer.parseFileNameFromPath(f))

	// IF filename is not sidebar.md THEN Exclude sidebar.md from file list
    var currentFilePath;
    if (filename === "sidebar"){
        currentFilePath = path.join(postsDirectory, "/sidebar.md")
    }
    else if (filename === "index"){
        currentFilePath = path.join(postsDirectory, "/index.md")
    }
    else {
        filePaths = filePaths.filter(f => !(f.endsWith("sidebar.md") && f.endsWith("index.md")))
        //console.log("\tDirectory is scanning to find corresponding filename")
        currentFilePath = Transformer.pairCurrentFile(filename, filePaths)
        //console.log("\tScan is finished. Founded filepath", currentFilePath, "\n")
    }
    

    var fileContent = Node.readFileSync(currentFilePath)

    //console.log("\tSearching any front matter data")
	const currentFileFrontMatter = Transformer.getFrontMatterData(fileContent)
	//console.log("\tFounded front matter data: ", currentFileFrontMatter, "\n")
    fileContent = Transformer.preprocessThreeDashes(fileContent)
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

	//var allPostsData = filePaths.map(filePath => {
	//		//console.log("filePath", filePaths)
	//		// Remove ".md" from file name to get id
	//		const slug = Transformer.parseFileNameFromPath(filePath)
	//		//console.log("slug", slug)
//
	//		// Read markdown file as string
	//		var fileContent = Transformer.preprocessThreeDashes(Node.readFileSync(filePath))
	//		//console.log("all backlinks fn")
	//		// Use gray-matter to parse the post metadata section
	//		const matterResult = Transformer.getFrontMatterData(fileContent) || [] // matter(fileContent).data
	//		//console.log("all post fn....")
//
	//		//const permalink = matterResult.permalink
	//		//const content = fileContent.split("---\n")[fileContent.split("---").length -1 ]
//
	//		// Combine the data with the slug
	//		return {
	//			id:slug.toLowerCase().split(" ").join("-"),
	//			...matterResult,
	//		}
	//})
  
  return fileNames
}