import Layout, {siteTitle} from "../components/layout";
import {getSinglePost, getGraphData, getDirectoryData, convertObject, getFlattenArray} from "../lib/utils";
import FolderTree from "../components/FolderTree";
import {Box} from '@mui/material'

export default function Home({content, graphdata, filenames, tree, flattenNodes, ...props}) {

    return (
        <Layout home>
            <div className = 'container'>
                <nav className="nav-bar">
                    <FolderTree tree={tree} flattenNodes={flattenNodes}/>
                </nav>
                <main className="markdown-rendered">
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
