import axios from "axios";
import { OnLoadArgs, OnLoadResult, PluginBuild } from "esbuild-wasm";
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (input: string) => {
  return {
    name: "fetch-plugin",
    setup(build: PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: "jsx",
          contents: input,
        };
      });

      build.onLoad(
        { filter: /.*/ },
        async (args: OnLoadArgs): Promise<OnLoadResult | undefined> => {
          const cachedData =
            await fileCache.getItem<Partial<OnLoadResult> | null>(args.path);

          if (cachedData) {
            return cachedData;
          }
        }
      );

      build.onLoad(
        { filter: /.css$/ },
        async (args: OnLoadArgs): Promise<Partial<OnLoadResult>> => {
          const {
            data = "",
            config,
            // @ts-ignore
            request,
          } = await axios.get<string | undefined>(args.path);

          const escaped = data
            .replace(/\n/g, "")
            .replace(/"/g, '\\"')
            .replace(/'/g, "\\'");

          const contents = `
            const styles = document.createElement('style');
            styles.innerText = '${escaped}';
            document.head.appendChild(styles);      
          `;

          const result: Partial<OnLoadResult> = {
            loader: "css",
            contents,
            resolveDir: new URL("./", request.responseURL).pathname,
          };

          await fileCache.setItem(args.path, result);

          return result;
        }
      );

      build.onLoad(
        { filter: /.*/ },
        async (args: OnLoadArgs): Promise<Partial<OnLoadResult>> => {
          const {
            data = "",
            // @ts-ignore
            request,
          } = await axios.get<string | undefined>(args.path);

          const result: Partial<OnLoadResult> = {
            loader: "jsx",
            contents: data,
            resolveDir: new URL("./", request.responseURL).pathname,
          };

          await fileCache.setItem(args.path, result);

          return result;
        }
      );
    },
  };
};
