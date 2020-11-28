import path from 'path'
import matter from 'gray-matter'
import fs from "fs"
import { Node } from "./node"
import { Remark } from "./remark";
import BiMap from "bimap";




const postsDirectory = path.join(process.cwd(), 'posts')

export function getSinglePost(filename, permalink) {
	// Get file names under /posts
	const filePaths = Node.getFiles(postsDirectory).filter(fn => fn.endsWith(".md"))
	const fileNames = filePaths.map(f => f.split("/")[f.split("/").length - 1].replace(".md", ""))
	const filesFrontMatterData = filePaths.map(fp => Remark.getFrontMatterData(fp))

	const currentFile = filePaths.filter(f => {
		const testFileName = f.split("/")[f.split("/").length - 1].replace(".md", "")
		return (filename.replace(".md", "") === testFileName)
	})[0]
	//console.log("currenFile: ", currentFile)
	//const currentFileFrontMatter = filesFrontMatterData.filter(f => f.permalink === permalink)[0]
	//console.log("Current File By Name: ", currentFile)
	const currentFileFrontMatter = Remark.getFrontMatterData(currentFile)
	//console.log("Current File By FrontMatter: ", currentFileFrontMatter)

	const fileContent = fs.readFileSync(currentFile, 'utf8')

	const [htmlContent, backlinks] = Remark.getHtmlContent(fileContent, {
		fileNames:fileNames,
	})

	return {
		id:filename,
		...currentFileFrontMatter,
		data:htmlContent
	  }
	
  }

export function getAllBacklinks(){
	//var bimap = new BiMap
	var backlinkList = []
	//bimap.push("key", "value");
	//bimap.key("key"); // => "value"
	//bimap.val("value"); // => "key"
	//bimap.push("France", ["Paris", "Lyon", "Marseille"]);

	// Get file names under /posts
	const filePaths = Node.getFiles(postsDirectory).filter(fn => fn.endsWith(".md")).filter(f => !f.endsWith("sidebar.md"))
	const fileNames = filePaths.map(f => f.split("/")[f.split("/").length - 1].replace(".md", ""))
	//console.log("filePaths", fileNames)

	var allBacklinkData = filePaths.map(fileName => {
			//console.log("filename", fileNames)
			// Remove ".md" from file name to get id
			const slug = fileName.replace(/\.md$/, '').split("/")[fileName.split("/").length - 1]
			//console.log("AllBacklinks slug", slug)

			// Read markdown file as string
			const fileContent = fs.readFileSync(fileName, 'utf8')
			
			const [htmlContent, backlinks] = Remark.getHtmlContent(fileContent, {
				fileNames:fileNames,
			})
			// Check if scanned slug post has any internal links
			if (backlinks.length > 0){
				//console.log("backlinks",[ slug, [backlinks]] )
				//bimap.push(slug, backlinks)

				// Check if internal link exists
				const internalLinks = backlinks.filter(bl => fileNames.includes(bl))
				backlinkList.push([slug, internalLinks])
				//console.log("bimap: ", bimap.key(slug))
			}

		// Combine the data with the slug
		return backlinkList.length > 0 ? JSON.stringify(backlinkList) : null
  	})
  
  return [allBacklinkData.filter(bl => bl !== null), JSON.stringify(fileNames)]
}

export function getPostListData() {
  // Get file names under /posts
  const filePaths = Node.getFiles(postsDirectory).filter(fn => fn.endsWith(".md"))
  const fileNames = filePaths.map(f => f.split("/")[f.split("/").length - 1].replace(".md", ""))
  //console.log("filePaths", filePaths)

  var allPostsData = filePaths.map(fileName => {
		//console.log("filename", fileNames)
	  	// Remove ".md" from file name to get id
	  	const slug = fileName.replace(/\.md$/, '').split("/")[fileName.split("/").length - 1]
	  	//console.log("slug", slug)

		// Read markdown file as string
		const fileContent = fs.readFileSync(fileName, 'utf8')
		
		// Use gray-matter to parse the post metadata section
		const matterResult = Remark.getFrontMatterData(fileContent)// matter(fileContent).data
		const permalink = matterResult.permalink
		const content = fileContent.split("---\n")[fileContent.split("---").length -1 ]

    // Combine the data with the slug
    return {
      id:slug,
	  ...matterResult,
    }
  })
  
  return allPostsData
}