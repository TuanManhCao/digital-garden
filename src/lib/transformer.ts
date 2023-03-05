import matter from "gray-matter";
import unified, { Settings } from "unified";
import markdown from "remark-parse";
import { wikiLinkPlugin } from "remark-wiki-link";
import html from "remark-html";
import externalLinks from "remark-external-links";
import highlight from "remark-highlight.js";
import rehypePrism from "rehype-prism-plus";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import obsidianImage from "./obsidian-image";
import { getAllMarkdownFiles, readFileSync } from "./io";
import { toFilePath, toSlug } from "./slug";
import { CustomNode } from "./graph";

export const Transformer = {
  haveFrontMatter: function (content: string | undefined): boolean {
    // console.log("\t Front matter data content", content)
    if (content === undefined || content === "") return false;
    const indexOfFirst = content.indexOf("---");
    // console.log("\t Front matter data firstIndex  ", indexOfFirst)
    // console.log("index first", indexOfFirst)
    if (indexOfFirst === -1) {
      return false;
    }
    const indexOfSecond = content.indexOf("---", indexOfFirst + 1);
    return indexOfSecond !== -1;
  },
  getFrontMatterData: function (filecontent: string) {
    if (Transformer.haveFrontMatter(filecontent)) {
      return matter(filecontent).data;
    }
    return {};
  },

  pageResolver: function (pageName: string): string[] {
    const allFileNames = getAllMarkdownFiles();
    const result = allFileNames.find((aFile) => {
      const parseFileNameFromPath = Transformer.parseFileNameFromPath(aFile);
      return (
        Transformer.normalizeFileName(parseFileNameFromPath ?? "") ===
        Transformer.normalizeFileName(pageName)
      );
    });

    // permalink = permalink.replace("ç", "c").replace("ı", "i").replace("ş", "s")
    // console.log(`/note/${toSlug(result)}`)
    if (result === undefined || result.length === 0) {
      // console.log("Cannot resolve file path   " + pageName)
    }

    // console.log("Internal Link resolved:   [" + pageName + "] ==> [" + temp[0] +"]")
    return result !== undefined && result.length > 0 ? [toSlug(result)] : ["/"];
  },
  hrefTemplate: function (permalink: string) {
    // permalink = Transformer.normalizeFileName(permalink)
    permalink = permalink.replace("ç", "c").replace("ı", "i").replace("ş", "s");
    return permalink;
  },
  getHtmlContent: function (content: string): string[] {
    const htmlContent: string[] = [];
    const sanitizedContent = Transformer.preprocessThreeDashes(content);

    const settings: Settings = { gfm: true };
    unified()
      .use(markdown, settings)
      .use(obsidianImage)
      .use(highlight)
      .use(externalLinks, { target: "_blank", rel: ["noopener"] })
      // .use(frontmatter, ['yaml', 'toml'])
      .use(wikiLinkPlugin, {
        permalinks: null,
        pageResolver: function (pageName) {
          return Transformer.pageResolver(pageName);
        },
        hrefTemplate: function (permalink) {
          return Transformer.hrefTemplate(permalink);
        },

        aliasDivider: "|",
      })
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      .use(remarkRehype)
      .use(rehypePrism)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      .use(rehypeStringify)
      .process(sanitizedContent, function (err, file) {
        htmlContent.push(String(file).replace("\n", ""));
        if (err != null) {
          console.log(`ERRROR:${err.message}`);
        }
      });

    return htmlContent.join("").split("---");
  },

  /* SANITIZE MARKDOWN FOR --- */
  preprocessThreeDashes: function (content: string): string {
    const indexOfFirst = content.indexOf("---");
    if (indexOfFirst === -1) {
      return content;
    }
    const indexOfSecond = content.indexOf("---", indexOfFirst + 1);
    content.slice(0, indexOfSecond);
    const contentPart = content.slice(indexOfSecond);
    return contentPart.split("---").join("");
  },

  /* Normalize File Names */
  normalizeFileName: function (filename: string) {
    let processedFileName = filename.replace(".md", "");
    processedFileName = processedFileName.replace("(", "").replace(")", "");
    processedFileName = processedFileName.split(" ").join("-");
    processedFileName = processedFileName.toLowerCase();
    const conversionLetters = [
      ["ç", "c"],
      ["ş", "s"],
      ["ı", "i"],
      ["ü", "u"],
      ["ö", "o"],
      ["ğ", "g"],
      ["Ç", "C"],
      ["Ş", "S"],
      ["İ", "I"],
      ["Ü", "U"],
      ["Ö", "O"],
      ["Ğ", "G"],
    ];
    conversionLetters.forEach((letterPair) => {
      processedFileName = processedFileName.split(letterPair[0]).join(letterPair[1]);
      // processedFileName = processedFileName.replace(letterPair[0], letterPair[1])
    });
    // console.log("filename", processedFileName)
    return processedFileName;
  },
  /* Parse file name from path then sanitize it */
  parseFileNameFromPath: function (filepath: string): string | null {
    if (filepath.includes("/")) {
      const splitPath = filepath.split("/");
      const parsedFileFromPath = splitPath[splitPath.length - 1];
      return parsedFileFromPath.replace(".md", "");
    } else {
      return null;
    }
  },
  /* Pair provided and existing Filenames */
  getInternalLinks: function (aFilePath) {
    const fileContent = readFileSync(aFilePath);
    const internalLinks: CustomNode[] = [];
    const sanitizedContent = Transformer.preprocessThreeDashes(fileContent);
    const settings: Settings = { gfm: true };
    unified()
      .use(markdown, settings)
      .use(wikiLinkPlugin, {
        pageResolver: function (pageName: string) {
          // let name = [Transformer.parseFileNameFromPath(pageName)];

          let canonicalSlug: string;
          if (pageName.includes("#")) {
            // console.log(pageName)
            const tempSlug = pageName.split("#")[0];
            if (tempSlug.length === 0) {
              // Meaning it in form of #Heading1 --> slug will be this file slug
              canonicalSlug = toSlug(aFilePath);
            } else {
              canonicalSlug = Transformer.pageResolver(tempSlug)[0].split("#")[0];
            }
          } else {
            canonicalSlug = Transformer.pageResolver(pageName)[0].split("#")[0];
          }

          const backLink: CustomNode = {
            title: Transformer.parseFileNameFromPath(toFilePath(canonicalSlug)),
            slug: canonicalSlug,
            shortSummary: canonicalSlug,
          };

          if (canonicalSlug != null && !internalLinks.includes(backLink)) {
            internalLinks.push(backLink);
          }

          return [canonicalSlug];
        },
        hrefTemplate: function (permalink) {
          return Transformer.hrefTemplate(permalink);
        },

        aliasDivider: "|",
      })
      .use(html)
      .processSync(sanitizedContent);

    // console.log("Internal Links of:   "  + aFilePath)
    // internalLinks.forEach(aLink => {
    //     console.log(aLink.title + " --> " + aLink.slug)
    // })
    // console.log("===============Internal Links")
    return internalLinks;
  },
};
