import "./cell-list-item.css";
import { Cell } from "../state";
import { ActionBar } from "./action-bar";
import { CodeCell } from "./code-cell";
import { TextEditor } from "./text-editor";

interface CellListItemProps {
  cell: Cell;
}

export const CellListItem = ({ cell }: CellListItemProps) => {
  let child: JSX.Element | null = null;

  if (cell.type === "code") {
    child = (
      <>
        <div
          className="action-bar-wrapper"
          style={{ backgroundColor: cell.color || "transparent" }}
        >
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  }
  if (cell.type === "text") {
    child = (
      <>
        <div
          className="action-bar-wrapper"
          style={{ backgroundColor: cell.color || "transparent" }}
        >
          <ActionBar id={cell.id} />
        </div>
        <TextEditor cell={cell} />
      </>
    );
  }

  if (!child) {
    return null;
  }

  return <div className="cell-list-item">{child}</div>;
};
