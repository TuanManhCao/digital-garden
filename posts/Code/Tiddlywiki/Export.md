This is a macro that exports all your tiddlers to static HTML files.

```
\define my-static-website()
<$action-sendmessage $message="tm-zip-create" $param="$:/temp/_ZipTiddler"/>
<$list filter="[all[tiddlers]!is[system]limit[100]]">
<$action-sendmessage $message="tm-zip-render-file" $param="$:/temp/_ZipTiddler" filename={{{ [<currentTiddler>encodeuricomponent[]addsuffix[.html]] }}} tiddler=<<currentTiddler>> template="$:/core/templates/static.tiddler.html"/>
</$list>
<$action-sendmessage $message="tm-zip-render-file" $param="$:/temp/_ZipTiddler" filename="static.css" template="$:/core/templates/static.template.css"/>
<$action-sendmessage $message="tm-zip-download" $param="$:/temp/_ZipTiddler" filename="cbs-dg.zip"/>
\end


<$button actions=<<my-static-website>>>
Generate Static Website
</$button>
```