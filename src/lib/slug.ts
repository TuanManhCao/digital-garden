import { FIRST_PAGE } from "../pages";
import { getAllMarkdownFiles, getFiles, getMarkdownFolder, isFile, readFileSync } from "./io";
import directoryTree from "directory-tree";
import markdown from "remark-parse";
import { toString } from "mdast-util-to-string";
import { convertObject, MdObject } from "./markdown";
import { Transformer } from "./transformer";
import unified from "unified";

interface SlugMap extends Map<string, string> {
  index: string;
}

const cachedSlugMap = getSlugHashMap();

export interface Content {
  id: string;
  title: string;
  data: string[];
}

export function getSinglePost(slug: string): Content {
  // List of filenames that will provide existing links to wikilink
  const currentFilePath = toFilePath(slug);
  // console.log("currentFilePath: ", currentFilePath)

  const splitPath = currentFilePath.split("/") ?? [];
  const fileNameWithExtension = splitPath.length !== 0 ? splitPath[splitPath.length - 1] : "";
  const splitedFileName = fileNameWithExtension.split(".");
  splitedFileName.pop();
  const fileName = splitedFileName.join();
  const fileContent = readFileSync(currentFilePath);

  // console.log("===============\n\nFile is scanning: ", slug)
  const htmlContent = Transformer.getHtmlContent(`# ${fileName}`);
  htmlContent.push(...Transformer.getHtmlContent(fileContent));
  // console.log("==================================")
  // console.log("hrmlcontents and backlinks")
  return {
    id: slug,
    title: fileName,
    // ...currentFileFrontMatter,
    data: htmlContent,
  };
}

export function toFilePath(slug: string): string {
  const result = cachedSlugMap.get(slug);
  return result ?? "";
}

export function getSlugHashMap(): Map<string, string> {
  // This is to solve problem of converting between slug and filepath,
  // where previously if I convert a slug to a file path sometime
  // it does not always resolve to correct filepath, converting function is not bi-directional
  // and not conflict-free, other solution was considered (hash file name into a hash, but this
  // is not SEO-friendly and make url look ugly ==> I chose this

  const slugMap = new Map<string, string>() as SlugMap;
  getAllMarkdownFiles().forEach((aFile) => {
    const aSlug = toSlug(aFile);
    // if (slugMap.has(aSlug)) {
    //     slugMap[aSlug].push(aFile)
    // } else {
    //     slugMap[aSlug] = [aFile]
    // }
    // Note: [Future improvement] Resolve conflict
    slugMap.set(aSlug, aFile);
  });

  const firstMd = `${FIRST_PAGE()}.md`;
  slugMap.set(FIRST_PAGE(), getMarkdownFolder() + `/${firstMd}`);
  slugMap.set("/", getMarkdownFolder() + `/${firstMd}`);

  return slugMap;
}

export function toSlug(filePath: string): string {
  if (isFile(filePath) && filePath.includes(getMarkdownFolder())) {
    return filePath
      .replace(getMarkdownFolder(), "")
      .replaceAll("/", "__")
      .replaceAll(" ", "++++")
      .replaceAll("&", "ambersand")
      .replace(".md", "");
  } else {
    // TODO handle this properly
    return "/";
  }
}

export function getAllSlugs(): string[] {
  // console.log("\n\nAll Posts are scanning")
  // Get file names under /posts
  const filePaths = getFiles(getMarkdownFolder()).filter(
    (f) => !(f.endsWith(FIRST_PAGE()) || f.endsWith("sidebar")),
  );
  return filePaths.map((f) => toSlug(f));
}

export function getDirectoryData(): MdObject {
  const filteredDirectory = directoryTree(getMarkdownFolder(), {
    extensions: /\.md/,
  });
  return convertObject(filteredDirectory);
}

export function getContent(slug: string): string | null {
  const currentFilePath = toFilePath(slug);
  if (currentFilePath === undefined || currentFilePath == null) return null;
  return readFileSync(currentFilePath);
}

export function getShortSummary(slug: string): string {
  const content = getContent(slug);
  if (content === null) {
    return "";
  }

  const tree = unified().use(markdown).parse(content);
  const plainText = toString(tree);
  return plainText.split(" ").splice(0, 40).join(" ");
}
