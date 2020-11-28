import Head from "next/head";
import Link from 'next/link'

import Layout, { siteTitle } from "../../components/layout";
import { getPostListData, getSinglePost} from "../../lib/post";

export default function Home({ note }) {
    console.log("Note Page: ", note)
    return (
        <Layout home>
            <Head>…</Head>
            <section
            >
                <div 
                    className="article-body" 
                    dangerouslySetInnerHTML={{__html:note.data}}>

                </div>
            </section>
        </Layout>
    );
}
export async function getStaticPaths() {
    const allPostsData = await getPostListData();
    const paths = allPostsData.map(p => ({params: {id:p.id}}))
    return {
      paths,
      fallback:false
    };
  }
export async function getStaticProps({ params }) {
    const note = await getSinglePost(params.id);
    console.log("note: ", note)
    return {
        props: {
            note,
        },
    };
}
