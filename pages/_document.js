import Document, { Html, Head, Main, NextScript } from 'next/document'
import { getSinglePost } from "../lib/post";
import Link from 'next/link'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        const sidebar = getSinglePost("sidebar.md")

        //console.log("document: ", sidebar)
        return { sidebar, ...initialProps }
    }

    render(props) {
        return (
        <Html data-wf-page="5fb1bacf34bc79d543fcd389" data-wf-site="5fb1bacf34bc79b9c4fcd388">
            <link rel="stylesheet"
                  href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.3.2/styles/default.min.css">
            <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.3.2/highlight.min.js"></script>

            <Head />
            <script src="https://d3js.org/d3.v6.min.js"></script>

            <body className="body">
            
            {/* NAVBAR */}
            <div data-collapse="medium" data-animation="default" data-duration="400" role="banner" class="navbar w-nav">
                <div class="container w-container">
                <div data-w-id="d4658744-8b5f-bf5e-9b20-4c31718a793d" class="w-nav-button" >
                    <div class="w-icon-nav-menu" id="nav-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>                    </div>
                </div>
                <Link href="/">
                    <a class="brand-3 w-nav-brand">
                        <p class="heading">Digital Backroom</p>
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
                        dangerouslySetInnerHTML={{__html:this.props.sidebar.data}}
                    >

                    </div>

                    {/* CONTENT */}
                    <main className="main">
                        <Main/>
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