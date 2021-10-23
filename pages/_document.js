import Document, { Html, Head, Main, NextScript } from 'next/document'
import { useRouter } from 'next/router'
import { useMemo } from "react";
import { getSinglePost } from "../lib/post";
import Link from 'next/link';

class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        //console.log("doc", initialProps)
        const sidebar = getSinglePost("sidebar")
        return { sidebar, ...initialProps }
    }

    render(props) {
        //console.log("document: ", this.props)
        return (
        <Html data-wf-page="5fb1bacf34bc79d543fcd389" data-wf-site="5fb1bacf34bc79b9c4fcd388">
            <meta name="google-site-verification" content="7iZ3AXo66Mm1qElIrjOAcUD6pqBeDQGC63zZfwiGhbE" />
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.3.2/styles/atom-one-dark.min.css" />
            <Head />
            <script src="https://d3js.org/d3.v3.min.js"></script>

            <body className="body">

                {/* NAVBAR */}
                <div data-collapse="medium" data-animation="default"
                    data-duration="400" role="banner" className="navbar w-nav"
                    id="navbar"
                    >
                    <div className="container w-container">
                    <div data-w-id="d4658744-8b5f-bf5e-9b20-4c31718a793d" className="w-nav-button" >
                        <div className="w-icon-nav-menu" id="nav-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        </div>
                    </div>
                        <Link href="/">
                            <a className="brand-3 w-nav-brand">
                                <p className="heading">Digital Backroom</p>
                            </a>
                        </Link>
                    </div>
                </div>


                <section className="section">
                    {/* SIDEBAR */}
                    <div
                        data-w-id="71d5791f-856a-b6c4-e8ee-0ab2729e1de3"
                        className="sidebar"
                        id="sidebar"

                    >
                        <div dangerouslySetInnerHTML={{__html:this.props.sidebar.data}} />

                    </div>

                    {/* CONTENT */}
                    <main className="main parent-main" id="main">
                        <Main ppp="" />
                    </main>
                </section>

            <NextScript />
            </body>
        </Html>
    )
  }
}

export function getStaticProps() {
    const sidebarData = getSinglePost("sidebar.md");
    console.log("index response: ", contentData, sidebarData)
    return {
        props: {
            sidebar:sidebarData
        },
    };
}

export default MyDocument
