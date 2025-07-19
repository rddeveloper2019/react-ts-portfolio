import "./resizable.css";
import { PropsWithChildren, SyntheticEvent, useEffect, useState } from "react";
import { ResizeCallbackData } from "react-resizable";
import { ResizableBoxProps } from "react-resizable";
import { ResizableBox } from "react-resizable";

export enum Direction {
  horizontal = "horizontal",
  vertical = "vertical",
}
interface ResizableProps {
  direction: Direction;
}

interface ResizeableOptions {
  height: number;
  width: number;
  resizeHandles: string[];
  minConstraints: [number, number];
  maxConstraints: [number, number];
  className?: string;
  onResizeStop?: (e: SyntheticEvent, data: any) => any;
}

export const Resizable = ({
  children,
  direction,
}: PropsWithChildren<ResizableProps>) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const listener = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setInnerWidth(window.innerWidth);
        setInnerHeight(window.innerHeight);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 400);
    };

    window.addEventListener("resize", listener);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", listener);
    };
  }, []);

  const options: {
    [Direction.horizontal]: ResizeableOptions;
    [Direction.vertical]: ResizeableOptions;
  } = {
    horizontal: {
      className: "resize-horizontal",
      height: Infinity,
      width: width,
      resizeHandles: ["e"],
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      onResizeStop: (_, data) => {
        setWidth(data.size.width);
      },
    },
    vertical: {
      className: "resize-vertical",
      height: 300,
      width: Infinity,
      resizeHandles: ["s"],
      minConstraints: [Infinity, 48],
      maxConstraints: [Infinity, innerHeight * 0.9],
    },
  };

  return <ResizableBox {...options[direction]}>{children}</ResizableBox>;
};
