import Head from "next/head";
import Layout from "../../components/layout";
import {getPostListData, getSinglePost, getGraphData, convertObject, getDirectoryData} from "../../lib/utils";
import FolderTree from "../../components/FolderTree";
import {getFlattenArray} from "../../lib/utils";
import MDContent from "../../components/MDContent";

export default function Home({ note, graphdata,tree, flattenNodes}) {
    return (
        <Layout>
            <Head>
                {note.title && <meta name="title" content={note.title} />}
            </Head>
            <div className = 'container'>
                <nav className="nav-bar">
                    <FolderTree tree={tree} flattenNodes={flattenNodes}/>
                </nav>
                <MDContent content={note.data}/>
            </div>
        </Layout>
    );
}
export async function getStaticPaths() {
    const allPostsData = getPostListData();
    const paths = allPostsData.map(p => ({params: {id:p}}))
    return {
      paths,
      fallback:false
    };
  }
export async function getStaticProps({ params }) {
    const note = getSinglePost(params.id);
    const tree = convertObject(getDirectoryData());
    const flattenNodes = getFlattenArray(tree)

    return {
        props: {
            note,
            tree: tree,
            flattenNodes: flattenNodes
        },
    };
}
