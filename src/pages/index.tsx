import Layout from "../components/Layout";
import { constructGraphData, CustomNode, getLocalGraphData, LocalGraphData } from "../lib/graph";
import { getFlattenArray, MdObject } from "../lib/markdown";
import { getDirectoryData, getSinglePost } from "../lib/slug";
import RootContainer from "../components/RootContainer";

export default function Home({
  graphData,
  content,
  tree,
  flattenNodes,
  backLinks,
}: Prop): JSX.Element {
  return (
    <Layout>
      <RootContainer
        content={content}
        tree={tree}
        flattenNodes={flattenNodes}
        graphData={graphData}
        backLinks={backLinks}
      />
    </Layout>
  );
}
const { nodes, edges } = constructGraphData();

export interface Prop {
  content: string[];
  tree: MdObject;
  flattenNodes: MdObject[];
  graphData: LocalGraphData;
  backLinks: CustomNode[];
}

// TODO make customizable
// FIXME This should be a string field, but I don't know to avoid init error
export function FIRST_PAGE(): string {
  return "README";
}

export function getStaticProps(): { props: Prop } {
  const fistPage = FIRST_PAGE();
  const tree = getDirectoryData();
  const contentData = getSinglePost(fistPage);
  const flattenNodes = getFlattenArray(tree);
  const listOfEdges = edges.filter((anEdge) => anEdge.target === fistPage);
  const internalLinks = listOfEdges
    .map((anEdge) => nodes.find((aNode) => aNode.slug === anEdge.source))
    .filter((element) => element !== undefined);
  const backLinks = internalLinks
    .filter((value, index, array) => array.indexOf(value) === index)
    .filter((v): v is CustomNode => v !== undefined);

  const graphData = getLocalGraphData(fistPage);
  return {
    props: {
      content: contentData.data,
      tree,
      flattenNodes,
      graphData,
      backLinks,
    },
  };
}
