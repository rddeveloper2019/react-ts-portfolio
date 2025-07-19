import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDOM from "react-dom/client";
import { useEffect, useRef, useState } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { Editor } from "./components/code-editor";

interface ExtendedHTMLIFrameElement extends HTMLIFrameElement {
  contentWindow: Window;
}

const el = document.getElementById("root");

const root = ReactDOM.createRoot(el!);

const html = `
  <html>
      <head>
        <title>Document</title>
      </head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener(
            "message",
            ({ data }) => {
              try {
                eval(data);
              } catch (error) {
                const root = document.querySelector("#root");
                root.innerHTML = '<div style="color: red;"><h4>Runtime error:</h4>' + error + '</div>';
                console.error(error);
              }
            },
            false
          );
        </script>
      </body>
  </html>

`;

const App = () => {
  const [input, setInput] = useState("");
  const serviceRef = useRef<esbuild.Service | null>(null);
  const iframeRef = useRef<ExtendedHTMLIFrameElement>(null);

  const initService = async () => {
    const service = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });

    serviceRef.current = service;
  };

  useEffect(() => {
    initService();
  }, []);

  const onCLick = async () => {
    if (!serviceRef.current) {
      return;
    }

    if (iframeRef.current) {
      iframeRef.current.srcdoc = html;
    }

    const output = await serviceRef.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        ["process.env.NODE_ENV"]: `"production"`,
        ["global"]: `"window"`,
        ["production"]: `"production"`,
      },
    });

    const code = output.outputFiles[0].text;
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage?.(code, "*");
    }
  };

  return (
    <div>
      <Editor initialValue="import React from 'react'" onChange={setInput} />
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={20}
        cols={80}
      ></textarea>
      <div>
        <button onClick={onCLick}>Submit</button>
      </div>
      <iframe
        title="preview"
        srcDoc={html}
        sandbox="allow-scripts"
        ref={iframeRef}
      ></iframe>
    </div>
  );
};

root.render(<App />);
