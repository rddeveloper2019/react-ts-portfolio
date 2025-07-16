import esbuild from "esbuild-wasm";

import { PluginBuild } from "esbuild-wasm";
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "filecache",
});

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: PluginBuild) {
      build.onResolve({ filter: /(^index\.js$)/ }, () => ({
        path: "index.js",
        namespace: "a",
      }));

      build.onResolve({ filter: /^\.+\// }, (args: esbuild.OnResolveArgs) => ({
        path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
        namespace: "a",
      }));

      build.onResolve({ filter: /.*/ }, async (args: esbuild.OnResolveArgs) => {
        return {
          path: `https://unpkg.com/${args.path}`,
          namespace: "a",
        };
      });
    },
  };
};
