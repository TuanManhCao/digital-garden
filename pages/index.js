import Layout from "../components/Layout";
import {getSinglePost, getDirectoryData, convertObject, getFlattenArray, getGraphData} from "../lib/utils";
import FolderTree from "../components/FolderTree";
import MDContainer from "../components/MDContainer";
import dynamic from 'next/dynamic'


// This trick is to dynamically load component that interact with window object (browser only)
const DynamicGraph = dynamic(
    () => import('../components/Graph'),
    { loading: () => <p>Loading ...</p>, ssr: false }
)

export default function Home({graphData, content, tree, flattenNodes}) {
    return (
        <Layout>
            <div className = 'container'>
                <nav className="nav-bar">
                    <FolderTree tree={tree} flattenNodes={flattenNodes}/>
                </nav>
                <MDContainer post={content.data}/>
                <DynamicGraph graph={graphData}/>
            </div>


        </Layout>
    );

}

export function getStaticProps() {
    const tree = convertObject(getDirectoryData());
    const contentData = getSinglePost("index");
    const flattenNodes = getFlattenArray(tree)
    const graphData = getGraphData("index");
    return {
        props: {
            content: contentData,
            tree: tree,
            flattenNodes: flattenNodes,
            graphData:graphData,
        },
    };
}
