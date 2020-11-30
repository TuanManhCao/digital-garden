import Head from "next/head";
import { useRouter } from 'next/router'
import { useEffect,useRef } from "react";
import Link from 'next/link'
import Layout, { siteTitle } from "../components/layout";
import { getSinglePost, getGraphData } from "../lib/post";
import { Network } from "../components/graph";


export default function Home({ content, graphdata, filenames, ...props }) {
    //console.log("Index Page Props: ", props /* backlinks, filenames*/)
    const ref = useRef(null);
    const router = useRouter()

    //var G = jsnx.binomialGraph(filenames.length, 1)
    //var G = jsnx.completeGraph(filenames.length);
    useEffect(() => {
        if (ref && ref.current){

            const G = Network({el:ref.current, graphdata, current:"index", router, allNodes:true})
        }
    }, [])
    return (
        <Layout home>
            <Head></Head>
            <img src="https://cbsofyalioglu.fra1.digitaloceanspaces.com/cbs/digital-garden.jpg"  />
            <section>
                <div dangerouslySetInnerHTML={{__html: content.data}} />
            </section>
            <hr/>

            <div id="graph-box" ref={ref}>

            </div>
        </Layout>
    );

}

export function getStaticProps() {
    const contentData = getSinglePost("index.md");
    const graphdata = getGraphData();
    return {
        props: {
            content:contentData,
            graphdata:graphdata, 
            //filenames:JSON.parse(filenamesRaw) 
            //sidebar:sidebarData
        },
    };
}
