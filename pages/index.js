import Head from "next/head";
import { useRouter } from 'next/router'
import { useEffect,useRef } from "react";
import Layout, { siteTitle } from "../components/layout";
import { getSinglePost, getGraphData } from "../lib/post";
import { Network } from "../components/graph";


export default function Home({ content, graphdata, filenames, ...props }) {
   //console.log("Index Page Props: ", content /* backlinks, filenames*/)
    const ref = useRef(null);
    const router = useRouter()
    const routeQuery = router.query.id
    const routeHandler = (r) => router.push(r)
    useEffect(() => {
        if (ref && ref.current){

            const G = Network({
                el:ref.current,
                graphdata,
                current:"index",
                routeQuery,
                routeHandler,
                allNodes:false // If true then shows every markdown file as node
            })
        }
    }, [])


    return (
        <Layout home>
            <section>
                <div dangerouslySetInnerHTML={{__html: content.data}} />
            </section>
        </Layout>
    );

}

export function getStaticProps() {
    const contentData = getSinglePost("index");
    const graphdata = getGraphData();
    return {
        props: {
            content:contentData,
            graphdata:graphdata, 
        },
    };
}
