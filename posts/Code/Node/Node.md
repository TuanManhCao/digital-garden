## path Module

```js
const notes = '/users/joe/notes.txt'

path.dirname(notes) // /users/joe
path.basename(notes) // notes.txt
path.extname(notes) // .txt
```

### join
```js
const name = 'joe'
path.join('/', 'users', name, 'notes.txt') //'/users/joe/notes.txt'
```

---

## fs Module
### Read the content of a directory

```js
const fs = require('fs')
const path = require('path')

const folderPath = '/Users/joe'

fs.readdirSync(folderPath)
```

<br/>

### Get Full Path

```js
fs.readdirSync(folderPath).map(fileName => {
  return path.join(folderPath, fileName)
})

```

### Filter the Result - Only Files

```javascript
const isFile = fileName => {
  return fs.lstatSync(fileName).isFile()
}

fs.readdirSync(folderPath).map(fileName => {
  return path.join(folderPath, fileName)
})
.filter(isFile)
```







