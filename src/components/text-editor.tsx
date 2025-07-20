import "./text-editor.css";
import MDEditor from "@uiw/react-md-editor/nohighlight";
import { useEffect, useRef, useState } from "react";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

interface TextEditorProps {
  cell: Cell;
}

export const TextEditor = ({ cell }: TextEditorProps) => {
  const [editing, setEditing] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        !(
          editorRef.current &&
          event.target &&
          editorRef.current?.contains(event.target as Node)
        )
      ) {
        setEditing(false);
      }
    };

    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener);
    };
  }, []);

  if (editing) {
    return (
      <div ref={editorRef}>
        <MDEditor
          className="text-editor"
          value={cell.content}
          onChange={(value = "") => updateCell(cell.id, value)}
          style={{ minHeight: 200 }}
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => setEditing(true)}
      className={`text-editor ${!editing ? "text-editor-default" : ""}`}
    >
      <div className="preview-card">
        <MDEditor.Markdown
          source={cell.content || "Click to edit"}
          style={{ padding: 25 }}
        />
      </div>
    </div>
  );
};
