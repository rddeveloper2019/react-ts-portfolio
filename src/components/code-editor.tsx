import "./code-editor.css";
import "./syntax.css";
import MonacoEditor, { Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useRef, useEffect } from "react";
import * as prettier from "prettier/standalone";
import * as babelParser from "prettier/parser-babel";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import * as estree from "prettier/plugins/estree";
import MonacoJSXHighlighter from "monaco-jsx-highlighter";

const babelParse = (code: string) =>
  parse(code, {
    sourceType: "module",
    plugins: ["jsx", "decorators", "decorators-legacy"],
  });

interface EditorProps {
  initialValue?: string;
  onChange: (value: string) => void;
}

export const Editor = ({ onChange, initialValue = "" }: EditorProps) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const highlighterRef = useRef<MonacoJSXHighlighter | null>(null);

  function handleEditorDidMount(
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) {
    editorRef.current = editor;

    try {
      const highlighter = new MonacoJSXHighlighter(
        monaco,
        babelParse,
        traverse,
        editor
      );

      highlighter.highlightOnDidChangeModelContent();

      highlighter.addJSXCommentCommand();

      highlighterRef.current = highlighter;

      setTimeout(() => highlighter.highlightCode(), 0);
    } catch (error) {
      console.error("Error initializing JSX highlighter:", error);
    }
  }

  useEffect(() => {
    return () => {
      highlighterRef.current?.dispose?.();
    };
  }, []);

  const handleChange = (value = "") => {
    onChange(value);
  };

  const handleFormatClick = async () => {
    if (!editorRef.current) return;

    const model = editorRef.current.getModel();
    if (!model) return;

    const unformatted = model.getValue();

    try {
      const formatted = await prettier.format(unformatted, {
        parser: "babel",
        //@ts-ignore
        plugins: [babelParser, estree],
        useTabs: false,
        semi: true,
        singleQuote: true,
      });

      editorRef.current.setValue(formatted.replace(/\n$/, ""));
    } catch (error) {
      console.error("Formatting error:", error);
    }
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={handleFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        defaultValue={initialValue}
        height="100%"
        language="javascript"
        theme="vs-dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
        onChange={handleChange}
        onMount={handleEditorDidMount}
      />
    </div>
  );
};
