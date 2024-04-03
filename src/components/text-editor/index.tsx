"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  MutableRefObject,
} from "react";
import Quill from "quill";
import Delta from "quill-delta";
import "quill/dist/quill.snow.css";
import "./index.css";
import ImageCompress from "quill-image-compress";

Quill.register("modules/imageCompress", ImageCompress as any);

const Editor = ({
  readOnly,
  defaultValue,
  onTextChange,
  onSelectionChange,
  getDelta,
  innerRef,
  withImage = false,
  withLink = false,
  withList = false,
  placeholder,
}: {
  readOnly?: boolean;
  defaultValue?: Delta;
  onTextChange?: (...args: any[]) => void;
  onSelectionChange?: (...args: any[]) => void;
  getDelta?: (...args: any[]) => void;
  innerRef?: MutableRefObject<Quill | null>;
  withImage?: boolean;
  withLink?: boolean;
  withList?: boolean;
  placeholder?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const defaultValueRef = useRef(defaultValue);
  const onTextChangeRef = useRef(onTextChange);
  const onSelectionChangeRef = useRef(onSelectionChange);

  useLayoutEffect(() => {
    onTextChangeRef.current = onTextChange;
    onSelectionChangeRef.current = onSelectionChange;
  });

  useEffect(() => {
    if (!innerRef) return;
    innerRef.current?.enable(!readOnly);
  }, [innerRef, readOnly]);

  useEffect(() => {
    if (!innerRef) return;
    const container = containerRef.current;
    if (!container) return;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );
    const quill = new Quill(editorContainer, {
      theme: "snow",
      modules: {
        toolbar: {
          handlers: {
            workround_bugfix: () => {},
          },
          container: [
            [
              "workround_bugfix",
              "bold",
              "italic",
              "underline",
              "clean",
              withLink && "link",
              withImage && "image",
              withList && { list: "ordered" },
              withList && { list: "bullet" },
            ].filter(Boolean),
          ],
        },
        keyboard: {
          bindings: {
            tab: {
              key: 9,
              handler: () => {
                return true;
              },
            },
          },
        },
        imageCompress: {
          quality: 0.7, // default
          maxWidth: 250, // default
          maxHeight: 250, // default
          imageType: "image/jpeg", // default
          debug: true, // default
          suppressErrorLogging: false, // default
          insertIntoEditor: undefined, // default
        },
      },
      placeholder,
    });

    innerRef.current = quill;

    if (defaultValueRef.current) {
      quill.setContents(defaultValueRef.current);
    }

    quill.on(Quill.events.TEXT_CHANGE, (...args) => {
      onTextChangeRef.current?.(...args);
    });

    quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
      onSelectionChangeRef.current?.(...args);
    });

    quill.on(Quill.events.EDITOR_CHANGE, () => {
      if (getDelta) getDelta(quill.getContents());
    });

    quill.focus();

    return () => {
      innerRef.current = null;
      container.innerHTML = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [innerRef]);

  return (
    <div className="quill textarea textarea-bordered" ref={containerRef}></div>
  );
};

Editor.displayName = "Editor";

export default Editor;
