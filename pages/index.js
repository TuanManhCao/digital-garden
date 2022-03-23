import Layout, {siteTitle} from "../components/layout";
import {getSinglePost, getGraphData, getDirectoryData, convertObject} from "../lib/post";
import FolderTree from "../components/FolderTree";

export default function Home({content, graphdata, filenames, tree, ...props}) {

    return (
        <Layout home>
            <section>
                <FolderTree tree={tree}/>
                <div dangerouslySetInnerHTML={{__html: content.data}}/>
            </section>
        </Layout>
    );

}

export function getStaticProps() {
    const tree = convertObject(getDirectoryData());
    const contentData = getSinglePost("index");
    const graphdata = getGraphData();
    return {
        props: {
            content: contentData,
            graphdata: graphdata,
            tree: tree
        },
    };
}
