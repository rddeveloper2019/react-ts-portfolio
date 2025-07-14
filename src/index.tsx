import ReactDOM from "react-dom/client";
import { useEffect, useRef, useState } from "react";
import * as esbuild from "esbuild-wasm";

const el = document.getElementById("root");

const root = ReactDOM.createRoot(el!);

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const serviceRef = useRef<esbuild.Service | null>(null);

  const initService = async () => {
    const service = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
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

    const output = await serviceRef.current.transform(input, {
      loader: "jsx",
      target: "es2015",
    });

    setCode(output.code);
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onCLick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

root.render(<App />);
