import { getAllMarkdownFiles, isFile } from "./io";
import path from "path";
import fs from "fs";
import { Transformer } from "./transformer";
import { isJapanese, toKana, tokenize, toRomaji } from "wanakana";
import { getRouterPath } from "./slug";

export interface SearchData {
  title: string;
  rawTitle: string | null;
  singleLineContent: string;
  rawContent: RawContent | null;
  lineAt: number;
  path: string;
}

export interface RawContent {
  raw: string;
  separatedOriginal: string[];
  separatedRaw: string[];
}

export function getSearchIndex(): SearchData[] {
  const filePath = path.join(process.cwd(), "search-index.json");
  if (fs.existsSync(filePath) && isFile(filePath)) {
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData.toString());
  } else {
    const result: SearchData[] = [];
    try {
      fs.rmSync(filePath);
    } catch (ignore) {}
    const filePaths = getAllMarkdownFiles();
    filePaths.forEach((markdownFile) => {
      const title = Transformer.parseFileNameFromPath(markdownFile);
      if (title == null) {
        return;
      }
      const rawTitle = isJapanese(title) ? toRomaji(title) : title;
      const content = fs.readFileSync(markdownFile);
      if (content === null || content === undefined) {
        return;
      }
      const path = getRouterPath(`${title}.md`);
      if (path === null) {
        return;
      }
      content
        .toString()
        .split("\n")
        .forEach((line, index) => {
          if (line.match("```") !== null || line.match("---") !== null) return;
          let rawContent: RawContent | null = null;
          if (isJapanese(line)) {
            const raw = toRomaji(line);
            const kenized = tokenize(line);
            const kanaizedRomaji = kenized.map((k) => toRomaji(toKana(k)));
            rawContent = {
              raw,
              separatedOriginal: kenized,
              separatedRaw: kanaizedRomaji,
            };
          }
          result.push({
            title,
            rawTitle,
            singleLineContent: line,
            lineAt: index,
            path,
            rawContent,
          });
        });
    });
    fs.writeFileSync(filePath, JSON.stringify(result), "utf-8");
    return result;
  }
}
