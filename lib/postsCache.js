import { convertObject, getDirectoryData } from './utils';

const cache = {};

export const getTree = () => {
    const tree = cache.tree != null ? cache.tree : convertObject(getDirectoryData());
    if (cache.tree == null) {
        cache.tree = tree;
        return tree;
    }
    return cache.tree;

};