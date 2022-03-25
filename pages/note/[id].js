import Head from "next/head";
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect,useRef } from "react";
import Layout, { siteTitle } from "../../components/layout";
import {getPostListData, getSinglePost, getGraphData, convertObject, getDirectoryData} from "../../lib/utils";
import { Network } from "../../components/graph";
import FolderTree from "../../components/FolderTree";
import {getFlattenArray} from "../../lib/utils";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function Home({ note, graphdata,tree, flattenNodes, ...props }) {
    var jsnx = require('jsnetworkx');

    //console.log("Note Page: ")
    //console.log("Index Page Props: ", props /* backlinks, filenames*/)

    const backlinks = graphdata.filter(g => g.data.target === note.id)

    const ref = useRef(null);
    const router = useRouter()
    const routeQuery = router.query.id
    const routeHandler = (r) => router.push(r)
    //console.log("route", router)

    var G;
    useEffect(() => {
        if (ref && ref.current){            
            G = Network({
                el:ref.current,
                graphdata,
                current:note.id,
                routeHandler,
                allNodes:false
            })
        }
}, [routeQuery])

    useEffect(() => {
        if (backlinks.length > 0){
            const sideBox = document.getElementById("side-graph-box");
            const Backlink = (data) => (
                <div className="backlink-box">
                    <Link href={data.id === "index" ? "/" : `/note/${data.id}`}>
                        <a>
                            {data.title ? data.title : data.id}
                        </a>
                    </Link>
                </div> 
                )
            
            //sideBox 
        }
    },[])


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
    const allPostsData = await getPostListData();
    const paths = allPostsData.map(p => ({params: {id:p}}))
    //console.log("paths", paths)
    return {
      paths,
      fallback:false
    };
  }
export async function getStaticProps({ params }) {
    console.log("params1", params.id)
    const note = await getSinglePost(params.id);
    //console.log("params2", note)
    const graphdata = getGraphData();
    //console.log("params3", params)
    const tree = convertObject(getDirectoryData());
    const flattenNodes = getFlattenArray(tree)
    //console.log("note: ", params)
    return {
        props: {
            note,
            graphdata:graphdata,
            tree: tree,
            flattenNodes: flattenNodes
        },
    };
}
