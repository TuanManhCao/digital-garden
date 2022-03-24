import Layout, {siteTitle} from "../components/layout";
import {getSinglePost, getGraphData, getDirectoryData, convertObject, getFlattenArray} from "../lib/utils";
import FolderTree from "../components/FolderTree";

export default function Home({content, graphdata, filenames, tree,flattenNodes, ...props}) {

    return (
        <Layout home>
            <section>
                <FolderTree tree={tree} flattenNodes = {flattenNodes}/>
                <div dangerouslySetInnerHTML={{__html: content.data}}/>
            </section>
        </Layout>
    );

}

export function getStaticProps() {
    const tree = convertObject(getDirectoryData());
    const contentData = getSinglePost("index");
    const graphdata = getGraphData();
    const flattenNodes = getFlattenArray(tree)
    return {
        props: {
            content: contentData,
            graphdata: graphdata,
            tree: tree,
            flattenNodes: flattenNodes
        },
    };
}
