import Head from "next/head";
import Layout from "../../components/Layout";
import {
  getAllSlugs,
  getSinglePost,
  getDirectoryData,
  constructGraphData,
  getLocalGraphData,
  getFlattenArray,
  Content,
  CustomNode,
} from "../../lib/utils";
import FolderTree from "../../components/FolderTree";
import MDContent from "../../components/MDContentData";
import dynamic from "next/dynamic";
import { Prop } from "../index";

const DynamicGraph = dynamic(async () => await import("../../components/Graph"), {
  loading: () => <p>Loading ...</p>,
  ssr: false,
});

interface InternalProp extends Prop {
  note: Content;
}

interface HomeElement extends HTMLElement {
  checked: boolean;
}

export default function Home({
  note,
  backLinks,
  tree,
  flattenNodes,
  graphData,
}: InternalProp): JSX.Element {
  const burgerId = "hamburger-input";
  const closeBurger = (): void => {
    const element = document.getElementById(burgerId) as HomeElement | null;
    if (element !== null) {
      element.checked = false;
    }
  };
  return (
    <Layout>
      <Head>{<meta name="title" content={note.title} />}</Head>

      <div className="container">
        <div className="burger-menu">
          <input type="checkbox" id={burgerId} className="burger-shower" />
          <label id="hamburger-menu" htmlFor="hamburger-input">
            <span className="menu">
              {" "}
              <span className="hamburger"></span>{" "}
            </span>
          </label>
          <nav>
            <FolderTree tree={tree} flattenNodes={flattenNodes} onNodeSelect={closeBurger} />
            <DynamicGraph graph={graphData} />
          </nav>
        </div>
        <nav className="nav-bar">
          <FolderTree tree={tree} flattenNodes={flattenNodes} />
        </nav>
        <MDContent content={note.data} backLinks={backLinks} />
        <DynamicGraph graph={graphData} />
      </div>
    </Layout>
  );
}

export async function getStaticPaths(): Promise<{
  paths: Array<{ params: { id: string } }>;
  fallback: false;
}> {
  const allPostsData = getAllSlugs();
  const paths = allPostsData.map((p) => ({ params: { id: p } }));

  return {
    paths,
    fallback: false,
  };
}

const { nodes, edges } = constructGraphData();

export function getStaticProps({ params }): { props: InternalProp } {
  const note = getSinglePost(params.id);
  const tree = getDirectoryData();
  const flattenNodes = getFlattenArray(tree);

  const listOfEdges = edges.filter((anEdge) => anEdge.target === params.id);
  const internalLinks = listOfEdges
    .map((anEdge) => nodes.find((aNode) => aNode.slug === anEdge.source) ?? null)
    .filter((element): element is CustomNode => element !== null);
  const backLinks = [...new Set(internalLinks)];
  const graphData = getLocalGraphData(params.id);
  return {
    props: {
      content: [],
      note,
      tree,
      flattenNodes,
      backLinks: backLinks.filter((link) => link.slug !== params.id),
      graphData,
    },
  };
}
