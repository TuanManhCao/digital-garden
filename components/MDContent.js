import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {useRouter} from 'next/router'
import Link from 'next/link'

function BackLinks({linkList}) {

    return (<ul>
        {
            (linkList != null && linkList.length > 0)
                ?
                linkList.map(aLink =>
                    <li>
                     <Link href={aLink.slug}>
                         <a>
                             {aLink.title}
                         </a>
                     </Link>
                    </li>
                )
                : <h1>No Back link found</h1>
        }
    </ul>);
}

function MDContent({content, fileNames, backLinks, handleOpenNewContent}) {

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
                🌱 <strong>Follow</strong> or <strong>DM</strong> me on Twitter at <span><a
                href="https://twitter.com/tuancm">@tuancm</a></span>
            </Alert>
            <div dangerouslySetInnerHTML={{__html: content}}/>
            <button onClick={handleInternalLinkClick}>Click me</button>
            <hr/>
            <div>
                <BackLinks linkList={backLinks}/>
            </div>
        </div>
    );
}

export default MDContent;