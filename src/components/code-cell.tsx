import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useState } from "react";

import { Editor } from "../components/code-editor";
import { Preview } from "../components/preview";
import { bundle } from "../bundler";

export const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onCLick = async () => {
    const result = await bundle(input);
    setCode(result);
  };

  return (
    <div>
      <Editor onChange={setInput} />
      <div>
        <button onClick={onCLick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};
