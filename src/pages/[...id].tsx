import Head from "next/head";
import Layout from "../components/Layout";
import { Content, getAllSlugs, getDirectoryData, getSinglePost } from "../lib/slug";
import { constructGraphData, CustomNode, getLocalGraphData, LocalGraphData } from "../lib/graph";
import { getFlattenArray, MdObject } from "../lib/markdown";
import RootContainer from "../components/RootContainer";
import { getSearchIndex, SearchData } from "../lib/search";

// TODO make customizable
// FIXME This should be a string field, but I don't know to avoid init error
export function FIRST_PAGE(): string {
  return "README";
}

export interface Prop {
  content: string[];
  tree: MdObject;
  flattenNodes: MdObject[];
  graphData: LocalGraphData;
  backLinks: CustomNode[];
  searchIndex: SearchData[];
}
interface InternalProp extends Prop {
  note: Content;
}

export default function Home({
  note,
  backLinks,
  tree,
  flattenNodes,
  graphData,
  searchIndex,
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
        searchIndex={searchIndex}
      />
    </Layout>
  );
}

export async function getStaticPaths(): Promise<{
  paths: Array<{ params: { id: string[] } }>;
  fallback: false;
}> {
  const allPostsData = getAllSlugs();
  const paths = allPostsData.map((p) => ({ params: { id: p.replace("/", "").split("/") } }));

  return {
    paths,
    fallback: false,
  };
}

const { nodes, edges } = constructGraphData();

export function getStaticProps({ params }: { params: { id: string[] } }): { props: InternalProp } {
  const note = getSinglePost(`/${params.id.join("/")}`);
  const tree = getDirectoryData();
  const flattenNodes = getFlattenArray(tree);

  const listOfEdges = edges.filter((anEdge) => anEdge.target === params.id.join("/"));
  const internalLinks = listOfEdges
    .map((anEdge) => nodes.find((aNode) => aNode.slug === anEdge.source) ?? null)
    .filter((element): element is CustomNode => element !== null);
  const backLinks = [...new Set(internalLinks)];
  const graphData = getLocalGraphData(params.id.join("/"));
  const searchIndex = getSearchIndex();
  return {
    props: {
      content: [],
      note,
      tree,
      flattenNodes,
      backLinks: backLinks.filter((link) => link.slug !== params.id.join("/")),
      graphData,
      searchIndex,
    },
  };
}
