import matter from 'gray-matter'
import unified from "unified";
import markdown from "remark-parse";
import {wikiLinkPlugin} from "remark-wiki-link";
import html from "remark-html";
import frontmatter from "remark-frontmatter";
import externalLinks from "remark-external-links";
import highlight from "remark-highlight.js";
import {Node} from "./node";
import rehypePrism from 'rehype-prism-plus'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import obsidianImage from './obsidian-image.js'
import {getAllMarkdownFiles, toFilePath, toSlug} from "./utils";

export const Transformer = {
    haveFrontMatter: function (content) {
        //console.log("\t Front matter data content", content)
        if (!content) return false
        const indexOfFirst = content.indexOf("---");
        //console.log("\t Front matter data firstIndex  ", indexOfFirst)
        //console.log("index first", indexOfFirst)
        if (indexOfFirst === -1) {
            return false
        }
        let indexOfSecond = content.indexOf("---", (indexOfFirst + 1));
        return indexOfSecond !== -1;

    },
    getFrontMatterData: function (filecontent) {
        if (Transformer.haveFrontMatter(filecontent)) {
            return matter(filecontent).data
        }
        return {}
    },


    pageResolver: function (pageName) {
        const allFileNames = getAllMarkdownFiles()
        const result = allFileNames.find(aFile => {
            let parseFileNameFromPath = Transformer.parseFileNameFromPath(aFile);
            return Transformer.normalizeFileName(parseFileNameFromPath) === Transformer.normalizeFileName(pageName)
            }
        )

        // permalink = permalink.replace("ç", "c").replace("ı", "i").replace("ş", "s")
        // console.log(`/note/${toSlug(result)}`)
        if (result === undefined || result.length === 0) {
            // console.log("Cannot resolve file path   " + pageName)
        }

        // console.log("Internal Link resolved:   [" + pageName + "] ==> [" + temp[0] +"]")
        return (result !== undefined && result.length > 0) ? [toSlug(result)] : ["/"]
    },
    hrefTemplate: function (permalink) {
        // permalink = Transformer.normalizeFileName(permalink)
        permalink = permalink.replace("ç", "c").replace("ı", "i").replace("ş", "s")
        return `/note/${permalink}`;
    }, getHtmlContent: function (content) {
        let htmlContent = []
        const sanitizedContent = Transformer.preprocessThreeDashes(content)

        unified()
            .use(markdown, {gfm: true})
            .use(obsidianImage)
            .use(highlight)        
            .use(externalLinks, {target: "_blank", rel: ['noopener']})
            // .use(frontmatter, ['yaml', 'toml'])
            .use(wikiLinkPlugin, {
                permalinks: null,
                pageResolver: function (pageName) {
                    return Transformer.pageResolver(pageName)
                },
                hrefTemplate: function (permalink) {
                    return  Transformer.hrefTemplate(permalink);
                },

                aliasDivider: "|"
            })
            .use(remarkRehype)
            .use(rehypePrism)
            .use(rehypeStringify)
            .process(sanitizedContent,
                function (err, file) {
                    htmlContent.push(String(file).replace("\n", ""))
                    if (err) {
                        console.log("ERRROR:" + err)
                    }
                }
            )
        htmlContent = htmlContent.join("")
        htmlContent = htmlContent.split("---")
        return [htmlContent]
    },

    /* SANITIZE MARKDOWN FOR --- */
    preprocessThreeDashes: function (content) {
        const indexOfFirst = content.indexOf("---");
        if (indexOfFirst === -1) {
            return content
        }
        const indexOfSecond = content.indexOf("---", (indexOfFirst + 1));
        content.slice(0, indexOfSecond);
        const contentPart = content.slice(indexOfSecond);
        return contentPart.split("---").join("")
    },

    /* Normalize File Names */
    normalizeFileName: function (filename) {
        let processedFileName = filename.replace(".md", "");
        processedFileName = processedFileName.replace('(', '').replace(')', '')
        processedFileName = processedFileName.split(" ").join("-")
        processedFileName = processedFileName.toLowerCase()
        const conversionLetters = [
            ["ç", "c"], ["ş", "s"], ["ı", "i"], ["ü", "u"], ["ö", "o"], ["ğ", "g"],
            ["Ç", "C"], ["Ş", "S"], ["İ", "I"], ["Ü", "U"], ["Ö", "O"], ["Ğ", "G"]

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
    parseFileNameFromPath: function (filepath) {
        if (typeof filepath ==='string' && filepath.includes("/")) {
            const parsedFileFromPath = filepath.split("/")[filepath.split("/").length - 1]
            return parsedFileFromPath.replace(".md", "")
        } else {
            console.log("Failed: CANNOT Parse" + filepath)
            return null
        }
    },
    /* Pair provided and existing Filenames*/
    getInternalLinks: function (aFilePath) {
        const fileContent = Node.readFileSync(aFilePath);
        const internalLinks = []
        const sanitizedContent = Transformer.preprocessThreeDashes(fileContent)
        unified()
            .use(markdown, {gfm: true})
            .use(wikiLinkPlugin, {
                pageResolver: function (pageName) {

                    // let name = [Transformer.parseFileNameFromPath(pageName)];

                    let canonicalSlug;
                    if (pageName.includes('#')) {
                        // console.log(pageName)
                        const tempSlug = pageName.split('#')[0]
                        if (tempSlug.length === 0) {
                            // Meaning it in form of #Heading1 --> slug will be this file slug
                            canonicalSlug = toSlug(aFilePath)
                        } else {
                            canonicalSlug =Transformer.pageResolver(tempSlug)[0].split('#')[0]
                        }
                    } else {
                        canonicalSlug = Transformer.pageResolver(pageName)[0].split('#')[0]
                    }


                    const backLink = {
                        title: Transformer.parseFileNameFromPath(toFilePath(canonicalSlug)),
                        slug: canonicalSlug,
                        shortSummary: canonicalSlug
                    }

                    if (canonicalSlug != null && internalLinks.indexOf(canonicalSlug) < 0) {
                        internalLinks.push(backLink);
                    }

                    return [canonicalSlug]
                }
                ,
                hrefTemplate: function (permalink) {
                    return Transformer.hrefTemplate(permalink)
                },

                aliasDivider: "|"
            })
            .use(html)
            .processSync(sanitizedContent)

        // console.log("Internal Links of:   "  + aFilePath)
        // internalLinks.forEach(aLink => {
        //     console.log(aLink.title + " --> " + aLink.slug)
        // })
        // console.log("===============Internal Links")
        return internalLinks;
    }
}
