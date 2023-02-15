import Layout from "../components/Layout";
import {
    getSinglePost,
    getFlattenArray,
    getLocalGraphData,
    constructGraphData
} from "../lib/utils";
import FolderTree from "../components/FolderTree";
import dynamic from 'next/dynamic'
import MDContent from "../components/MDContent";
import { getTree } from '../lib/postsCache';


// This trick is to dynamically load component that interact with window object (browser only)
const DynamicGraph = dynamic(
    () => import('../components/Graph'),
    { loading: () => <p>Loading ...</p>, ssr: false }
)

export default function Home({graphData, content, tree, flattenNodes, backLinks}) {
    return (
        <Layout>
            <div className = 'container'>
                <nav className="nav-bar">
                    <FolderTree tree={tree} flattenNodes={flattenNodes}/>
                </nav>
                <MDContent content={content}  handleOpenNewContent={null} backLinks={backLinks}/>
                <DynamicGraph graph={graphData}/>
            </div>
        </Layout>
    );

}
const {nodes, edges} = constructGraphData()

export function getStaticProps() {
    const tree = getTree();
    const contentData = getSinglePost("index");
    const flattenNodes = getFlattenArray(tree)
    const listOfEdges =   edges.filter(anEdge => anEdge.target === "index")
    const internalLinks = listOfEdges.map(anEdge => nodes.find(aNode => aNode.slug === anEdge.source)).filter(element => element !== undefined)
    const backLinks = [...new Set(internalLinks)]

    const graphData = getLocalGraphData("index");
    return {
        props: {
            content: contentData.data,
            tree: tree,
            flattenNodes: flattenNodes,
            graphData:graphData,
            backLinks: backLinks
        },
    };
}
