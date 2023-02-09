import { DirectoryTree } from "directory-tree";
import { getRouterPath } from "./slug";

export interface MdObject {
  name: string;
  children: MdObject[];
  id: string;
  routePath: string | null;
}

export function convertObject(thisObject: DirectoryTree): MdObject {
  const children: MdObject[] = [];

  const objectName = thisObject.name;
  const routerPath = getRouterPath(objectName);
  const newObject: MdObject = {
    name: objectName,
    children,
    id: objectName,
    routePath: routerPath,
  };

  if (thisObject.children != null && thisObject.children.length > 0) {
    thisObject.children.forEach((aChild) => {
      const newChild = convertObject(aChild);
      children.push(newChild);
    });
    return newObject;
  } else {
    return newObject;
  }
}

function flat(array: MdObject[]): MdObject[] {
  let result: MdObject[] = [];
  array.forEach(function (a) {
    result.push(a);
    if (Array.isArray(a.children)) {
      result = result.concat(flat(a.children));
    }
  });
  return result;
}

export function getFlattenArray(thisObject: MdObject): MdObject[] {
  return flat(thisObject.children);
}
