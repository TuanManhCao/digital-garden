import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {useRouter} from 'next/router'

function MDContent({content, handleOpenNewContent}) {

    function handleInternalLinkClick() {
        //Processing fetching
        //pass result up to parent container
        //TODO: handle clicking on internal link, go fetching md content from file then passing it up to parent
        handleOpenNewContent(content)
    }
    const router = useRouter();
    return (

    <div className="markdown-rendered">
        <Alert severity="info">
            <AlertTitle>Want to know more?</AlertTitle>
            🌱 <strong>Follow</strong> or <strong>DM</strong> me on Twitter at <span><a href="https://twitter.com/tuancm">@tuancm</a></span>
        </Alert>
        <div dangerouslySetInnerHTML={{__html: content}}/>
        <button onClick={handleInternalLinkClick}>Click me </button>
    </div>
    );
}

export default MDContent;