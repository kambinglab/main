"use client";

import "react-quill/dist/quill.snow.css";
import "./index.css";
import { FC, useState } from "react";
import dynamic from "next/dynamic";
import { DeltaStatic, Sources } from "quill";
import { Value, UnprivilegedEditor } from "react-quill";
import { mergeClassname } from "@utils/merge-classname";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <textarea
      className="textarea textarea-bordered"
      value="Loading..."
      readOnly
    />
  ),
});

interface Props {
  value: Value | undefined;
  onChange: (
    value: string,
    delta: DeltaStatic,
    source: Sources,
    editor: UnprivilegedEditor
  ) => void;
  withLink?: boolean;
  withImage?: boolean;
  withList?: boolean;
  placeholder?: string;
  size?: "sm" | "md";
}

const textAreaSize = {
  sm: "textarea-sm",
  md: "textarea-md",
};

const TextEditor: FC<Props> = ({
  value,
  onChange,
  withImage = false,
  withLink = false,
  withList = false,
  placeholder,
  size = "md",
}) => {
  const modules = {
    toolbar: [
      [
        "bold",
        "italic",
        "underline",
        withLink && "link",
        withImage && "image",
        withList && { list: "ordered" },
        withList && { list: "bullet" },
        "clean",
      ].filter(Boolean),
    ],
  };

  const [focus, setFocus] = useState(false);

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      className={mergeClassname(
        "textarea textarea-bordered",
        size,
        textAreaSize[size],
        focus ? "focus" : ""
      )}
      modules={modules}
      placeholder={placeholder}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    />
  );
};

export default TextEditor;
