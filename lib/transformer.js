import matter from 'gray-matter'
import path from 'path'
import fs from "fs"
var remark = require('remark')
//import remark2react from 'remark-react'

var remark2react = require("remark-react");
const unified = require('unified')
const markdown = require('remark-parse')
const { wikiLinkPlugin } = require('remark-wiki-link');

var guide = require('remark-preset-lint-markdown-style-guide')
var html = require('remark-html')
var report = require('vfile-reporter')
var vfile = require('to-vfile')
var frontmatter = require('remark-frontmatter')
var stringify = require('remark-stringify')
var externalLinks = require('remark-external-links')
const highlight = require('remark-highlight.js')


const postsDirectory = path.join(process.cwd(), 'posts')
const isFile = fileName => {
	return fs.lstatSync(fileName).isFile()
}

export const Transformer = {
    haveFrontMatter:function(content){
        //console.log("\t Front matter data content", content)
        if (!content) return false
        var indexOfFirst = content.indexOf("---")
        //console.log("\t Front matter data firstIndex  ", indexOfFirst)
        //console.log("index first", indexOfFirst)
        if (indexOfFirst === -1){
            return false
        }
        var indexOfSecond = content.indexOf("---", (indexOfFirst + 1))
        if (indexOfSecond !== -1) {
            return true
        }
        return false
    },
    getFrontMatterData:function(filecontent){
        if (Transformer.haveFrontMatter(filecontent)){   
            return matter(filecontent).data
        }
        return {}
    },


    getHtmlContent:function(content, {fileNames}){
        let htmlContent = []
        let internalLinks = []
        const sanitizedContent = Transformer.preprocessThreeDashes(content)
		unified()
            .use(markdown, { gfm: true })
            .use(highlight)
            .use(externalLinks, {target: "_blank", rel: ['noopener']})
            .use(frontmatter, ['yaml', 'toml'])
            .use(wikiLinkPlugin, {
                permalinks:fileNames,
                pageResolver: function(pageName){
                    const name = [Transformer.parseFileNameFromPath(pageName)]
                    //console.log("\n\nwiki internal links", Transformer.parseFileNameFromPath(name[0]));
                    internalLinks.push(Transformer.parseFileNameFromPath(name[0]));
                    return name
                },
                hrefTemplate: function(permalink){
                    permalink = Transformer.normalizeFileName(permalink)
                    permalink = permalink.replace("ç","c").replace("ı","i").replace("ş","s")
                    //console.log("wiki pemalink", permalink);
                    return `/note/${permalink}`
                },

                aliasDivider:"|"
            }).use(html)
            .process(sanitizedContent,
                function (err, file) {
                    //console.log("asd", String(file).slice(0,50))
                        //console.error("remark: ", report(err || file))
                        htmlContent.push(String(file).replace("\n", ""))
                    }
            )
        htmlContent =  htmlContent.join("")
        htmlContent = htmlContent.split("---")
        //console.log("ffffff ", htmlContent)
        return [htmlContent, internalLinks]
    },

    /* SANITIZE MARKDOWN FOR --- */
    preprocessThreeDashes:function(content){
        var indexOfFirst = content.indexOf("---")
        if (indexOfFirst === -1){
            return content
        }
        var indexOfSecond = content.indexOf("---", (indexOfFirst + 1))
        const frontPart = content.slice(0, indexOfSecond);
        const contentPart = content.slice(indexOfSecond);
        const processedContent = contentPart.split("---").join("")
        //console.log("preprocess", indexOfFirst, indexOfSecond)
        //return frontPart.concat(processedContent)
        return processedContent
    },

    /* Normalize File Names */
    normalizeFileName:function(filename){
        var processedFileName = filename.replace(".md", "")
        processedFileName = processedFileName.replace('(', '').replace(')', '')
        processedFileName = processedFileName.split(" ").join("-")
        // processedFileName = processedFileName.toLowerCase()
        const conversionLetters = [
            ["ç", "c"], ["ş","s"], ["ı", "i"], ["ü","u"], ["ö","o"], ["ğ","g"],
            ["Ç", "C"], ["Ş","S"], ["İ", "I"], ["Ü","U"], ["Ö","O"], ["Ğ","G"]

        ];
        conversionLetters.forEach(letterPair => {
            processedFileName = processedFileName.split(letterPair[0]).join(letterPair[1])
            //processedFileName = processedFileName.replace(letterPair[0], letterPair[1])
            }
        )
        //console.log("filename", processedFileName)
        return processedFileName
    },
    /* Parse file name from path then sanitize it */
    parseFileNameFromPath:function(filepath){
        const parsedFileFromPath = filepath.split("/")[filepath.split("/").length - 1]
        const parsedFileName =  parsedFileFromPath.replace(".md", "")
        return Transformer.normalizeFileName(parsedFileName)
    },

    /* Pair provided and existing Filenames*/
    pairCurrentFile: function(provided, ListOfFilePaths){
        //console.log(provided, ListOfFilePaths)
        const providedSanitizedFileName = Transformer.normalizeFileName(provided);
        
        // Map file paths and return true if it pairs with provided
        const possibleFilePath =  ListOfFilePaths.filter(possibleFilePath => {
            const possibleFileName = Transformer.parseFileNameFromPath(possibleFilePath);
            const possibleSanitizedFileName = Transformer.normalizeFileName(possibleFileName)
            //console.log("----", providedSanitizedFileName, possibleSanitizedFileName)
            
            //console.log("---", possibleSanitizedFileName, providedSanitizedFileName)
            if (providedSanitizedFileName === possibleSanitizedFileName){
                return true
            }
            return false
        })
        console.log("p---", possibleFilePath)
        return possibleFilePath[0]
    }
}
