import FolderTree from "./FolderTree";
import MDContent from "./MDContentData";
import { Prop } from "../pages";
import dynamic from "next/dynamic";
import { SearchBar } from "./Search";

interface HomeElement extends HTMLElement {
  checked: boolean;
}

const DynamicThemeSwitcher = dynamic(async () => await import("./ThemeSwitcher"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

// This trick is to dynamically load component that interact with window object (browser only)
const DynamicGraph = dynamic(async () => await import("./Graph"), {
  loading: () => <p>Loading ...</p>,
  ssr: false,
});

export default function RootContainer({
  graphData,
  content,
  tree,
  flattenNodes,
  backLinks,
  searchIndex,
}: Prop): JSX.Element {
  const burgerId = "hamburger-input";
  const closeBurger = (): void => {
    const element = document.getElementById(burgerId) as HomeElement | null;
    if (element !== null) {
      element.checked = false;
    }
  };
  return (
    <div className="fixed flex h-full w-full flex-row overflow-hidden">
      <div className="burger-menu">
        <input type="checkbox" id={burgerId} />
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
      <div>
        <nav className="nav-bar">
          <DynamicThemeSwitcher />
          <SearchBar index={searchIndex} />
          <FolderTree tree={tree} flattenNodes={flattenNodes} />
        </nav>
      </div>
      <MDContent content={content} backLinks={backLinks} />
      <DynamicGraph graph={graphData} />
    </div>
  );
}
