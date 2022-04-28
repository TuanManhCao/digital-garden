import {visit} from "unist-util-visit";

const regex = /\!\[\[(([a-z\-_0-9\\/\:]+\s*)+\.(jpg|jpeg|png|gif|svg|webp))]]/gi;
const regex2 = /\!\[\[(([a-z\-_0-9\\/\:]+\s*)+\.(jpg|jpeg|png|gif|svg|webp))]]/gi; //TODO why can't I reuse regex literal???

function convertTextNode(node) {
    const searchText = node.value;

    /*
    This regex MATCH following type of image link
      ![[youtube.png]]    ==> Image with no folder path, no space in between
      ![[a .png]]         ==> with space
      ![[tuancao/a.png]]  ==> file path WITHOUT space
      ![[tuancao/a .png]] ==> file path WITH space

    Image with extension: jpg, jpeg, gif, svg, webp, png
      ![[/tuancao/a.jpg]]
      ![[/tuancao/a.webp]]
      ![[/tuancao/a.png]]
      ![[/tuancao/a.jpeg]]
      ...

      ---
    Will NOT match following case

      [[picture.jpg]] ==> Link without "!" at the begining won't match
      ![[abc]] ==> without the extension
      ![[/tuancao/a.md]] ==> Unsupported format
      ![[/tuancao/a.mp4]]==> Unsupported format
    */
    const matches = searchText.matchAll(
        regex
    );

    let startIndex = 0;
    let endIndex = searchText.length;

    let children = [];
    for (const match of matches) {
        endIndex = match.index;

        // Constructing text node from un-matched string
        const textNode = {
            // change type child node, so that visit() function won't recursively visit this node with "text" type
            type: "text-temp",
            value: searchText.substring(startIndex, endIndex),
        };

        const imageNode = {
            type: "image",
            //TODO: Use some kind of option to pass in default images path
            url: encodeURI(`/images/${match[1]}`), //encode white space from file name
            alt: match[1],
        };

        children.push(imageNode);

        let matchEndIndex = match.index + match[0].length;
        startIndex = matchEndIndex;
    }

    if (startIndex < searchText.length) {
        const textNode = {
            type: "text-temp",
            value: searchText.substring(startIndex, searchText.length),
        };
        children.push(textNode);
    }

    return {
        type: "paragraph",
        children: children,
    };
}

export default function attacher(options) {
    return function transformer(tree, vfile) {
        visit(tree, "text", (node) => {
            if (regex2.test(node.value)) {
                const newNode = convertTextNode(node);
                node.type = "paragraph";
                node.children = newNode.children;
            }
        });

        // Change back "text-temp" node ==> "text" to clean up
        visit(tree, "text-temp", (node) => {
            node.type = "text";
        });

        return tree;
    };
}
