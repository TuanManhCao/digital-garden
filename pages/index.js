import Layout from "../components/layout";
import {getSinglePost, getDirectoryData, convertObject, getFlattenArray} from "../lib/utils";
import FolderTree from "../components/FolderTree";
import MDContainer from "../components/MDContainer";

export default function Home({content, tree, flattenNodes}) {

    return (
        <Layout>
            <div className = 'container'>
                <nav className="nav-bar">
                    <FolderTree tree={tree} flattenNodes={flattenNodes}/>
                </nav>
                <MDContainer post={content.data}/>
            </div>
        </Layout>
    );

}

export function getStaticProps() {
    const tree = convertObject(getDirectoryData());
    const contentData = getSinglePost("index");
    const flattenNodes = getFlattenArray(tree)
    return {
        props: {
            content: contentData,
            tree: tree,
            flattenNodes: flattenNodes
        },
    };
}
