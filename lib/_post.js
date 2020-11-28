import path from 'path'
import matter from 'gray-matter'
import fs from "fs"
import { Node } from "./node"


var remark = require('remark')
const unified = require('unified')
const markdown = require('remark-parse')
const { wikiLinkPlugin } = require('remark-wiki-link');

var guide = require('remark-preset-lint-markdown-style-guide')
var html = require('remark-html')
var report = require('vfile-reporter')

const postsDirectory = path.join(process.cwd(), 'posts')
const isFile = fileName => {
	return fs.lstatSync(fileName).isFile()
}


export function getSortedPostsData() {
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
		  //console.log("content", content)
		  //console.log("frontmatter \n\n", fileContents)
	  //    let processor = unified()
	  //        .use(markdown, { gfm: true })
	  //        .use(wikiLinkPlugin)
		  const htmlContent = Remark.getHtmlContent(fileContent, {
			  fileNames:fileNames,
			  permalink: `/note/${permalink}`
		  })
  
		  //unified()
		  //.use(markdown)
		  //.use(wikiLinkPlugin, {
		  //	permalinks:fileNames,
		  //	pageResolver: function(pageName){return [pageName.replace(/ /g, "-").toLowerCase()]},
		  //	hrefTemplate: function(permalink){return `/note/${permalink}`}
		  //}).use(html)
		  //.process(content,
		  //	function (err, file) {
		  //		//console.log("asd", String(file).slice(0,50))
		  //		//console.error("remark: ", report(err || file))
		  //			htmlContent.push(String(file).replace("\n", ""))
		  //		}
		  //)
  
  
	  //console.log("tree",tree)
  
  
	  console.log("htmlContent", htmlContent,)
	  // Combine the data with the slug
	  return {
		id:slug,
		...matterResult,
		data:htmlContent
	  }
	})
	
	return allPostsData
  }

export async function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = Node.getFiles(postsDirectory).filter(fn => fn.endsWith(".md"))
  console.log("filenames", fileNames)

  var allPostsData = fileNames.map(fileName => {
		//console.log("filename", fileName)
	  	// Remove ".md" from file name to get id
	  	const slug = fileName.replace(/\.md$/, '').split("/")[fileName.split("/").length - 1]
	  	//console.log("slug", slug)

    // Read markdown file as string
    const fileContents = fs.readFileSync(fileName, 'utf8')
	
    // Use gray-matter to parse the post metadata section
	const matterResult = matter(fileContents).data
	const content = fileContents.split("---\n")[fileContents.split("---").length -1 ]
	//console.log("content", content)
    //console.log("frontmatter \n\n", fileContents)
//    let processor = unified()
//        .use(markdown, { gfm: true })
//        .use(wikiLinkPlugin)
	const htmlContent = []
  	remark().use(html).
      	process(content,
		    function (err, file) {
            //console.log("asd", String(file).slice(0,50))
			//console.error("remark: ", report(err || file))
			    htmlContent.push(String(file).replace("\n", ""))
            })
	//var processor = unified()
	//		.use(markdown, { gfm: true })
	//		.use(wikiLinkPlugin)
	
	//console.log("processor", processor);
	//const res = process.stdin.pipe(stream(processor)).pipe(process.stdout)
	var tree = unified().use(markdown).parse(content)
	console.log(tree)


    console.log("htmlContent", htmlContent.length,)
    // Combine the data with the slug
    return {
      id:slug,
	  ...matterResult,
	  data:htmlContent.join("")
    }
  })
  
  return allPostsData
}