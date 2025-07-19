import { useEffect, useRef } from "react";

interface PreviewProps {
  code: string;
}

interface ExtendedHTMLIFrameElement extends HTMLIFrameElement {
  contentWindow: Window;
}

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

export const Preview = ({ code }: PreviewProps) => {
  const iframeRef = useRef<ExtendedHTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = html;
      iframeRef.current.contentWindow?.postMessage?.(code, "*");
    }
  }, [code]);

  return (
    <iframe
      ref={iframeRef}
      title="preview"
      srcDoc={html}
      sandbox="allow-scripts"
    />
  );
};
