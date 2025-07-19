declare module "monaco-jsx-highlighter" {
  class MonacoJSXHighlighter {
    constructor(
      monaco: any,
      parse: (code: string) => any,
      traverse: any,
      editor: editor.IStandaloneCodeEditor
    );
    highlightCode(): void;
    highlightOnDidChangeModelContent(): void;
    addJSXCommentCommand(): void;
    dispose(): void;
  }
  export = MonacoJSXHighlighter;
}

declare module "react-resizable";
