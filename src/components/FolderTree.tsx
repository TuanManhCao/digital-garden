import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import { MdObject } from "../lib/markdown";

const TCTreeItem = styled(TreeItem)(() => ({
  "& .MuiTreeItem-content": {
    "& .MuiTreeItem-label": {
      fontSize: "1rem",
      paddingLeft: "6px",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,',
      lineHeight: 2.0,
    },
  },
}));

export default function FolderTree(props: {
  onNodeSelect?: () => void;
  tree: MdObject;
  flattenNodes: MdObject[];
}): JSX.Element {
  const renderTree = (nodes: MdObject): JSX.Element => (
    <TCTreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {nodes.children.map((node) => renderTree(node))}
    </TCTreeItem>
  );

  const router = useRouter();
  // const childrenNodeIds = props.tree.children.map(aNode => {return aNode.id})
  const expandedNodes = [props.tree.id];
  return (
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={expandedNodes}
      defaultExpandIcon={<ChevronRightIcon />}
      onNodeSelect={(event, nodIds) => {
        const currentNode = props.flattenNodes.find((aNode) => {
          return aNode.id === nodIds;
        });
        // console.log(event)
        // console.log(currentNode)
        if (currentNode?.routePath != null) {
          void router.push(currentNode.routePath);
          // router.reload()
          if (props.onNodeSelect !== undefined) {
            props.onNodeSelect();
          }
        }
      }}
      sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      {renderTree(props.tree)}
    </TreeView>
  );
}
