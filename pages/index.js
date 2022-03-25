import Layout, {siteTitle} from "../components/layout";
import {getSinglePost, getGraphData, getDirectoryData, convertObject, getFlattenArray} from "../lib/utils";
import FolderTree from "../components/FolderTree";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function Home({content, graphdata, filenames, tree, flattenNodes, ...props}) {

    return (
        <Layout home>
            <div className = 'container'>
                <nav className="nav-bar">
                    <FolderTree tree={tree} flattenNodes={flattenNodes}/>
                </nav>
                <main className="markdown-rendered">
                    <Alert severity="info">
                        <AlertTitle>Want to know more?</AlertTitle>
                        🌱 <strong>Follow</strong> or <strong>DM</strong> me on Twitter at <span><a href="https://twitter.com/tuancm">@tuancm</a></span>
                    </Alert>
                    <div dangerouslySetInnerHTML={{__html: content.data}}/>
                </main>
            </div>
        </Layout>
    );

}

export function getStaticProps() {
    const tree = convertObject(getDirectoryData());
    const contentData = getSinglePost("index");
    const graphdata = getGraphData();
    const flattenNodes = getFlattenArray(tree)
    return {
        props: {
            content: contentData,
            graphdata: graphdata,
            tree: tree,
            flattenNodes: flattenNodes
        },
    };
}
