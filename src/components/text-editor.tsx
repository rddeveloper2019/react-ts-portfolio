import "./text-editor.css";
import MDEditor from "@uiw/react-md-editor/nohighlight";
import { useEffect, useRef, useState } from "react";

export const TextEditor = () => {
  const [value, setValue] = useState<string | undefined>();
  const [editing, setEditing] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);

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
          value={value}
          onChange={setValue}
          style={{ minHeight: 200 }}
        />
      </div>
    );
  }

  return (
    <div onClick={() => setEditing(true)} className="text-editor">
      <div className="preview-card">
        <MDEditor.Markdown
          source={value}
          style={{ minHeight: 200, padding: 25 }}
        />
      </div>
    </div>
  );
};
