import path from 'path'
import fs from "fs"


export const Node = {
    isFile: function (filename): boolean {
        try {
            return fs.lstatSync(filename).isFile()
        } catch (err) {
            console.log(err)
            return false
        }

    },
    getFullPath: function (folderPath) {
        return fs.readdirSync(folderPath).map(fn => path.join(folderPath, fn))
    },
    getFiles: function (dir: fs.PathLike): string[] {
        let results: string[] = [];
        fs.readdirSync(dir).forEach(function (file) {
            file = dir + '/' + file;
            const stat = fs.statSync(file);
            if (stat && stat.isDirectory()) {
                /* Recurse into a subdirectory */
                results = results.concat(Node.getFiles(file));
            } else {
                /* Is a file */
                results.push(file);
            }
        });
        return results.filter(f => f.endsWith(".md"))
    },
    readFileSync: function (fullPath): string {
        return fs.readFileSync(fullPath, "utf8")
    },

    getMarkdownFolder: function (): string {
        return path.join(process.cwd(), 'posts')
    }
}