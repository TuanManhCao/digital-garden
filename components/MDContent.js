import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function MDContent({content}) {
    return (
    <div className="markdown-rendered">
        <Alert severity="info">
            <AlertTitle>Want to know more?</AlertTitle>
            🌱 <strong>Follow</strong> or <strong>DM</strong> me on Twitter at <span><a href="https://twitter.com/tuancm">@tuancm</a></span>
        </Alert>
        <div dangerouslySetInnerHTML={{__html: content}}/>
    </div>
    );
}

export default MDContent;