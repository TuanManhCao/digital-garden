import React from "react";
// import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';
import { useRouter } from "next/router";
import { CustomNode } from "../lib/utils";

function BackLinks({ linkList }: { linkList: CustomNode[] }): JSX.Element {
  return (
    <div className="note-footer">
      <h3 className="backlink-heading">Link to this note</h3>
      {linkList != null && linkList.length > 0 ? (
        <>
          <div className="backlink-container">
            {linkList.map((aLink) => (
              <div key={aLink.slug} className="backlink">
                {/* <Link href={aLink.slug}> */}
                <a href={aLink.slug}>
                  <p className="backlink-title">{aLink.title}</p>
                  <p className="backlink-preview">{aLink.shortSummary} </p>
                </a>
                {/* </Link> */}
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {" "}
          <p className="no-backlinks"> No backlinks found</p>{" "}
        </>
      )}
    </div>
  );
}

export interface MDContentData {
  content: string[];
  backLinks: CustomNode[];
}

function MDContent({ content, backLinks }: MDContentData): JSX.Element {
  // function handleInternalLinkClick() {
  //     //Processing fetching
  //     //pass result up to parent container
  //     //TODO: handle clicking on internal link, go fetching md content from file then passing it up to parent
  //     handleOpenNewContent(content)
  // }

  useRouter();
  return (
    <div className="markdown-rendered">
      {/* <Alert severity="info"> */}
      {/*    <AlertTitle>Want to know more?</AlertTitle> */}
      {/*    🌱 <strong>Follow</strong> or <strong>DM</strong> me on Twitter at <span><a */}
      {/*    href="https://twitter.com/tuancm">@tuancm</a></span> */}
      {/* </Alert> */}
      <div dangerouslySetInnerHTML={{ __html: content.join() }} />
      {/* <button onClick={handleInternalLinkClick}>Click me</button> */}
      {/* <hr/> */}
      <div>
        <BackLinks linkList={backLinks} />
      </div>
      <hr />
      <footer>
        <p>
          Powered by <a href="https://github.com/turtton/volglass">Volglass</a>, © 2023
        </p>
      </footer>
    </div>
  );
}

export default MDContent;
