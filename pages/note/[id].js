import Head from "next/head";
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect,useRef } from "react";
import Layout, { siteTitle } from "../../components/layout";
import { getPostListData, getSinglePost, getGraphData} from "../../lib/post";
import { Network } from "../../components/graph";
import Cytoscape from "cytoscape";


export default function Home({ note, graphdata, ...props }) {
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
                {note.canonical && <meta name="canonical_url" content={note.canonical} />}
                {note.description && <meta name="description" content={note.description} />}

            </Head>
            <section
            >
                {/* COVER IMAGE */}
                {note.cover && <img src={note.cover}  />}

                {/* TITLE */}
                {note.title && <h1>{note.title}</h1>}

                <div 
                    className="article-body" 
                    dangerouslySetInnerHTML={{__html:note.data}}>

                </div>
            </section>
            <hr/>
            <div id="graph-box" ref={ref}>

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
    
    //console.log("note: ", params)
    return {
        props: {
            note,
            graphdata:graphdata, 
        },
    };
}
