import Head from "next/head";
import Layout from "../../components/Layout";
import { Prop } from "../index";
import { Content, getAllSlugs, getDirectoryData, getSinglePost } from "../../lib/slug";
import { constructGraphData, CustomNode, getLocalGraphData } from "../../lib/graph";
import { getFlattenArray } from "../../lib/markdown";
import RootContainer from "../../components/RootContainer";

interface InternalProp extends Prop {
  note: Content;
}

export default function Home({
  note,
  backLinks,
  tree,
  flattenNodes,
  graphData,
}: InternalProp): JSX.Element {
  return (
    <Layout>
      <Head>{<meta name="title" content={note.title} />}</Head>
      <RootContainer
        content={note.data}
        tree={tree}
        flattenNodes={flattenNodes}
        graphData={graphData}
        backLinks={backLinks}
      />
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
