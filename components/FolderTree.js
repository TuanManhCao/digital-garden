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
    return (
        <TreeView
            aria-label="rich object"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={['root']}
            defaultExpandIcon={<ChevronRightIcon />}
            onNodeSelect = {(event, nodIds) => {
                const currentNode = props.flattenNodes.find(aNode => {return aNode.id === nodIds})
                // console.log(event)
                // console.log(currentNode)
                if (currentNode != null && currentNode.routePath != null) {
                    router.push(currentNode.routePath)
                }
            }}
            sx={{ height: 110, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >
            {renderTree(props.tree)}
        </TreeView>
    );
}
