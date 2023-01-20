import Layout from "../components/Layout";
import {
    getSinglePost,
    getDirectoryData,
    getFlattenArray,
    getLocalGraphData,
    constructGraphData, MdObject, LocalGraphData, CustomNode
} from "../lib/utils";
import FolderTree from "../components/FolderTree";
import dynamic from 'next/dynamic'
import MDContent from "../components/MDContent";


// This trick is to dynamically load component that interact with window object (browser only)
const DynamicGraph = dynamic(
    () => import('../components/Graph'),
    { loading: () => <p>Loading ...</p>, ssr: false }
)

export default function Home({graphData, content, tree, flattenNodes, backLinks}: Prop): JSX.Element {
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
const { nodes, edges } = constructGraphData()

export type Prop = {
    content: string[]
    tree: MdObject
    flattenNodes: MdObject[]
    graphData: LocalGraphData
    backLinks: CustomNode[]
}

export function getStaticProps(): {props: Prop} {
    const tree = getDirectoryData();
    const contentData = getSinglePost("index");
    const flattenNodes = getFlattenArray(tree)
    const listOfEdges =   edges.filter(anEdge => anEdge.target === "index")
    const internalLinks = listOfEdges.map(anEdge => nodes.find(aNode => aNode.slug === anEdge.source)).filter(element => element !== undefined)
    const backLinks = internalLinks.filter((value, index, array) => array.indexOf(value) === index)


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
