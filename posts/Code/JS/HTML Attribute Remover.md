String şeklinde verilen HTML'deki tüm attributeları siler.

```js
let regex = /<\s*([a-z][a-z0-9]*)\s.*?>/gi
a.replace(regex, '<$1>')
```
<br/>

Örnek olarak a stringine bakalım

```js
let a = `<div class="ce-block"><div class="ce-block__content"><h1 class="ce-header" contenteditable="false" data-placeholder="Enter a header">Add a Title</h1></div></div><div class="ce-block"><div class="ce-block__content"><div class="ae-paragraph cdx-block" contenteditable="true" data-placeholder="Title">Content will be here</div></div></div>`
```
<br/>
Aşağıdaki komut bize temiz HTML'i verecektir.

```js
a.replace(regex, '<$1>')
```


#html-code
