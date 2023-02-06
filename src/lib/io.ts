import fs, { PathLike } from "fs";
import path from "path";

export function getAllMarkdownFiles(): string[] {
  return getFiles(getMarkdownFolder());
}

export function getFiles(dir: string): string[] {
  let results: string[] = [];
  fs.readdirSync(dir).forEach(function (file) {
    file = dir + "/" + file;
    const stat = fs.statSync(file);
    if (stat?.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(getFiles(file));
    } else {
      /* Is a file */
      results.push(file);
    }
  });
  return results.filter((f) => f.endsWith(".md"));
}

export function readFileSync(fullPath): string {
  return fs.readFileSync(fullPath, "utf8");
}

export function getMarkdownFolder(): string {
  return path.join(process.cwd(), "posts");
}

export function getFullPath(folderPath: string): string[] {
  return fs.readdirSync(folderPath).map((fn) => path.join(folderPath, fn));
}

export function isFile(filename: PathLike): boolean {
  try {
    return fs.lstatSync(filename).isFile();
  } catch (err) {
    console.log(err);
    return false;
  }
}
