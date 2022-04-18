import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { useRouter } from 'next/router'

export default function FolderTree(props) {
    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </TreeItem>
    );

    const router = useRouter()
    // const childrenNodeIds = props.tree.children.map(aNode => {return aNode.id})
    const expandedNodes = [props.tree.id]
    return (
        <TreeView
            aria-label="rich object"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={expandedNodes}
            defaultExpandIcon={<ChevronRightIcon />}
            onNodeSelect = {(event, nodIds) => {
                const currentNode = props.flattenNodes.find(aNode => {return aNode.id === nodIds})
                // console.log(event)
                // console.log(currentNode)
                if (currentNode != null && currentNode.routePath != null) {
                    router.push(currentNode.routePath)
                    // router.reload()
                }
            }}
            sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >
            {renderTree(props.tree)}
        </TreeView>
    );
}
