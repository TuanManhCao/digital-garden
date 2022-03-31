import Head from "next/head";
import Layout from "../../components/layout";
import {getPostListData, getSinglePost, getGraphData, convertObject, getDirectoryData} from "../../lib/utils";
import FolderTree from "../../components/FolderTree";
import {getFlattenArray} from "../../lib/utils";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function Home({ note, graphdata,tree, flattenNodes, ...props }) {
    return (
        <Layout home>
            <Head>
                {note.title && <meta name="title" content={note.title} />}
            </Head>
            <div className = 'container'>
                <nav className="nav-bar">
                    <FolderTree tree={tree} flattenNodes={flattenNodes}/>
                </nav>
                <main className="markdown-rendered">
                    <Alert severity="info">
                        <AlertTitle>Want to know more?</AlertTitle>
                        🌱 <strong>Follow</strong> or <strong>DM</strong> me on Twitter at <span><a href="https://twitter.com/tuancm">@tuancm</a></span>
                    </Alert>
                    <div dangerouslySetInnerHTML={{__html: note.data}}/>
                </main>
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
