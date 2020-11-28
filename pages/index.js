import Head from "next/head";
import { useEffect,useRef } from "react";
import Link from 'next/link'
import Layout, { siteTitle } from "../components/layout";
import { getSinglePost, getAllBacklinks } from "../lib/post";
var jsnx = require('jsnetworkx');

export default function Home({ content, backlinks, filenames }) {
    const ref = useRef(null);
    console.log("Index Page Props: ", backlinks, filenames)
    //var G = jsnx.binomialGraph(filenames.length, 1)
    //var G = jsnx.completeGraph(filenames.length);
    useEffect(() => {
        if (ref.current){

        var G = new jsnx.Graph();
        G.addNode(1, {count: 12});
        G.addNode(2, {count: 8});  
        G.addNode(3, {count: 15});
        G.addEdgesFrom([[1,2],[2,3]]);
        jsnx.draw(G, {
            element: ref.current,
            withLabels: true,
            nodeAttr: {
              r: function(d) {
                // `d` has the properties `node`, `data` and `G`
                return d.data.count;
              }
            }
          });
        }
    })
    return (
        <Layout home>
            <Head>…</Head>
            <section
            >
                <div 
                    dangerouslySetInnerHTML={{__html: content.data}}
                ></div>
                <div id="demo-canvas" ref={ref}></div>
            </section>
        </Layout>
    );

}

export function getStaticProps() {
    const contentData = getSinglePost("index.md");
    const [backlinksRaw, filenamesRaw] = getAllBacklinks();
    return {
        props: {
            content:contentData,
            backlinks:JSON.parse(backlinksRaw), 
            filenames:JSON.parse(filenamesRaw)
            //sidebar:sidebarData
        },
    };
}
