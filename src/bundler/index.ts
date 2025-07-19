import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

let service: esbuild.Service;

export const bundle = async (rawCode: string) => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  }

  try {
    const output = await service.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        ["process.env.NODE_ENV"]: `"production"`,
        ["global"]: `"window"`,
        ["production"]: `"production"`,
      },
    });

    return { code: output.outputFiles[0].text, error: "" };
  } catch (error: any) {
    return { code: "", error: error };
  }
};
