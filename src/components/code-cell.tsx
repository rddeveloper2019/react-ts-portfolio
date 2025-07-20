import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useEffect, useState } from "react";

import { Editor } from "../components/code-editor";
import { Preview } from "../components/preview";
import { bundle } from "../bundler";
import { Direction, Resizable } from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

let timer: NodeJS.Timer;

interface CodeCellProps {
  cell: Cell;
}

export const CodeCell = ({ cell }: CodeCellProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const { updateCell } = useActions();

  useEffect(() => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      if (cell.content) {
        const result = await bundle(cell.content);
        setCode(result.code);
        setError(result.error.message);
      } else {
        setCode("");
        setError("");
      }
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction={Direction.vertical}>
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction={Direction.horizontal}>
          <Editor
            onChange={(value) => updateCell(cell.id, value)}
            initialValue={cell.content}
          />
        </Resizable>

        <Preview code={code} error={error} />
      </div>
    </Resizable>
  );
};
