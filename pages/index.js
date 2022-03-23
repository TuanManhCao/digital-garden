import Head from "next/head";
import Layout, {siteTitle} from "../components/layout";
import {getSinglePost, getGraphData, getDirectoryData} from "../lib/post";

import dynamic from 'next/dynamic'
const BasicTree = dynamic(() => import('../components/FileNavBar'));

export default function Home({content, graphdata, filenames, directoryTree, ...props}) {

    return (
        <Layout home>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap"
                      rel="stylesheet"/>
            </Head>
            <section>
                {/*<BasicTree directoryTree/>*/}
                <div dangerouslySetInnerHTML={{__html: content.data}}/>
            </section>
        </Layout>
    );

}

export function getStaticProps() {

    console.log("getStaticProps")

    // const abc =
    const convertedData = {name: "Test", children:[
            {name: "Test", children:[
                    {name: "Test", children:[

                        ]}
                ]}
        ]}
    const contentData = getSinglePost("index");
    const graphdata = getGraphData();
    return {
        props: {
            content: contentData,
            graphdata: graphdata,
            directoryTree: convertedData,
        },
    };
}
