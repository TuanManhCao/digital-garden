import path from 'path'
import matter from 'gray-matter'
import fs from "fs"
import { Node } from "./node"


var remark = require('remark')
const unified = require('unified')
const markdown = require('remark-parse')
var guide = require('remark-preset-lint-markdown-style-guide')
var html = require('remark-html')
var report = require('vfile-reporter')

const postsDirectory = path.join(process.cwd(), 'posts')
const isFile = fileName => {
	return fs.lstatSync(fileName).isFile()
}
