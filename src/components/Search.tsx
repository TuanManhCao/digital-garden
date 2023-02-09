import { TextField } from "@mui/material";
import Fuse from "fuse.js";
import IFuseOptions = Fuse.IFuseOptions;
import { SearchData } from "../lib/search";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import { isJapanese, toRomaji } from "wanakana";
import { match } from "ts-pattern";

interface SearchProp {
  index: readonly SearchData[];
}

interface ResultProp {
  contents: DataResult;
  hidden: boolean;
  setHidden: Dispatch<SetStateAction<boolean>>;
  setMouseOvering: Dispatch<SetStateAction<boolean>>;
}

interface SearchResult extends SearchData {
  startPos: number;
  key: string | undefined;
}

type DataResult = readonly SearchResult[] | "Empty";

const fuseConfig: IFuseOptions<SearchData> = {
  keys: ["title", "rawTitle", "singleLineContent", "rawContent.raw"],
  includeMatches: true,
};

export function SearchBar(prop: SearchProp): JSX.Element {
  const fuse = new Fuse(prop.index, fuseConfig);
  const [hitData, setHitData] = useState("Empty" as DataResult);
  const [isResultHidden, setResultHidden] = useState(false);
  const [isMouseOveringResult, setMouseOveringResult] = useState(false);
  return (
    <div
      className="mb-4 px-2.5"
      onBlur={() => {
        if (!isMouseOveringResult) {
          setResultHidden(true);
        }
      }}
    >
      <TextField
        className="bg-white"
        fullWidth
        label="Search"
        onFocus={() => {
          setResultHidden(false);
        }}
        onChange={(input) => {
          let text = input.target.value;
          if (text.length === 0) {
            setHitData("Empty");
            return;
          }
          if (isJapanese(text)) {
            text = toRomaji(text);
          }
          let result = fuse.search(text).map((r) => {
            const item = r.item as SearchResult;
            const matches = r.matches;
            if (matches === undefined || matches.length < 1) return item;
            item.startPos = matches[0].indices[0][0] ?? 0;
            item.key = matches[0].key ?? "";
            return item;
          });
          const titles = result.map((r) => r.title);
          result = result.filter((value, index) => index === titles.indexOf(value.title));
          if (result.length > 5) {
            result.length = 5;
          }
          setHitData(result);
        }}
      />
      <ResultList
        contents={hitData}
        hidden={isResultHidden}
        setHidden={setResultHidden}
        setMouseOvering={setMouseOveringResult}
      />
    </div>
  );
}

function ResultList({ contents, hidden, setHidden, setMouseOvering }: ResultProp): JSX.Element {
  const router = useRouter();
  if (contents === "Empty") {
    return <div hidden={true} />;
  }
  return (
    <div
      className="absolute z-10 mt-2 w-11/12 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
      hidden={hidden}
    >
      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
        {contents.length === 0 ? (
          <li className="inline-flex w-full px-4 py-2">
            <p>Not Found</p>
          </li>
        ) : (
          contents.map((data) => (
            <li
              key={data.rawTitle}
              className="inline-flex w-full px-4 py-2 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={(): void => {
                // TODO: Route target text line
                void router.push(data.path);
                setHidden(true);
              }}
              onMouseOver={() => {
                setMouseOvering(true);
              }}
              onMouseLeave={() => {
                setMouseOvering(false);
              }}
            >
              <button className="w-full truncate" key={data.title}>
                <p className="w-full truncate text-left underline">{data.title}</p>
                <p className="truncate text-left text-xs text-gray-500">
                  {data.lineAt}:{" "}
                  {match<string | undefined, string>(data.key)
                    .with("singleLineContent", (): string =>
                      data.singleLineContent.substring(data.startPos),
                    )
                    .with("rawContent.raw", (): string => {
                      let startDistance = data.startPos;
                      const rawContent = data.rawContent;
                      if (rawContent === null) return data.singleLineContent;
                      let result: string | null = null;
                      rawContent.separatedRaw.forEach((value, index) => {
                        if (startDistance <= value.length) {
                          result = rawContent.separatedOriginal
                            .filter((value, originalIndex) => index <= originalIndex)
                            .join("");
                          if (index !== 0) {
                            result = `...${result}`;
                          }
                          return;
                        }
                        startDistance = startDistance - value.length;
                      });
                      return result ?? data.singleLineContent;
                    })
                    .otherwise(() => data.singleLineContent)}
                </p>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
