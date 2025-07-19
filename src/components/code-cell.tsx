import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useEffect, useState } from "react";

import { Editor } from "../components/code-editor";
import { Preview } from "../components/preview";
import { bundle } from "../bundler";
import { Direction, Resizable } from "./resizable";

let timer: NodeJS.Timer;
export const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      const result = await bundle(input);
      setCode(result.code);
      setError(result.error.message);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction={Direction.vertical}>
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction={Direction.horizontal}>
          <Editor onChange={setInput} />
        </Resizable>

        <Preview code={code} error={error} />
      </div>
    </Resizable>
  );
};
