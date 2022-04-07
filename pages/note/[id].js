import Head from "next/head";
import Layout from "../../components/layout";
import {
    getContentPaths,
    getSinglePost,
    convertObject,
    getDirectoryData,
    constructBackLinks, getFileNames
} from "../../lib/utils";
import FolderTree from "../../components/FolderTree";
import {getFlattenArray} from "../../lib/utils";
import MDContent from "../../components/MDContent";

export default function Home({note, backLinks, fileNames, tree, flattenNodes}) {
    return (
        <Layout>
            <Head>
                {note.title && <meta name="title" content={note.title}/>}
            </Head>
            <div className='container'>
                <nav className="nav-bar">
                    <FolderTree tree={tree} flattenNodes={flattenNodes}/>
                </nav>
                <MDContent content={note.data} fileNames={fileNames} handleOpenNewContent={null} backLinks={backLinks}/>
            </div>
        </Layout>
    );
}

export async function getStaticPaths() {
    const allPostsData = getContentPaths();
    const paths = allPostsData.map(p => ({params: {id: p}}))
    return {
        paths,
        fallback: false
    };
}

const {nodes, edges} = constructBackLinks()

export function getStaticProps({params}) {
    const note = getSinglePost(params.id);
    const tree = convertObject(getDirectoryData());
    const flattenNodes = getFlattenArray(tree)
    // const fileNames = getAllFileNames()
    const { fileNames} = getFileNames(params.id)

    const listOfEdges =   edges.filter(anEdge => anEdge.target === params.id)
    const internalLinks = listOfEdges.map(anEdge => nodes.find(aNode => aNode.slug === anEdge.source)).filter(element => element !== undefined)

    return {
        props: {
            note,
            tree: tree,
            flattenNodes: flattenNodes,
            fileNames: fileNames,
            backLinks: internalLinks
        },
    };
}
