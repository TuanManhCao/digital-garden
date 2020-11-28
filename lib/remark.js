import matter from 'gray-matter'
var remark = require('remark')
import path from 'path'
import fs from "fs"
import remark2react from 'remark-react'

const unified = require('unified')
const markdown = require('remark-parse')
const { wikiLinkPlugin } = require('remark-wiki-link');

var guide = require('remark-preset-lint-markdown-style-guide')
var html = require('remark-html')
var report = require('vfile-reporter')
var frontmatter = require('remark-frontmatter')



const postsDirectory = path.join(process.cwd(), 'posts')
const isFile = fileName => {
	return fs.lstatSync(fileName).isFile()
}

export const Remark = {
    getFrontMatterData:function(filecontent){return matter(filecontent).data},

    getHtmlContent:function(content, {fileNames}){
        let htmlContent = []
        let backlinks = []
		unified()
            .use(markdown, { gfm: true })
            .use(frontmatter, ['yaml', 'toml'])
            .use(wikiLinkPlugin, {
                permalinks:fileNames,
                pageResolver: function(pageName){
                    const name = [pageName.replace(/ /g, "-").toLowerCase()]
                    backlinks.push(name[0]);
                    //console.log("backlinks", backlinks);
                    return name
                },
                hrefTemplate: function(permalink){
                    //console.log("wiki pemalink", permalink);
                    permalink = permalink.replace("ç","c").replace("ı","i").replace("ş","s")
                    return `/note/${permalink}`
                }
            }).use(html)
            .process(content,
                function (err, file) {
                    //console.log("asd", String(file).slice(0,50))
                        //console.error("remark: ", report(err || file))
                        htmlContent.push(String(file).replace("\n", ""))
                    }
            )
        htmlContent =  htmlContent.join("")
        htmlContent = htmlContent.split("---")
        //console.log("ffffff ", htmlContent)
        return [htmlContent, backlinks]
    }
}
