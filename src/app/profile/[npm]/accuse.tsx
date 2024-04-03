"use client";

import { useState } from "react";
import TextEditor from "@components/text-editor";

const Accuse = () => {
  const [showForm, setShowForm] = useState(false);
  const [descriptionHtml, setDescriptionHtml] = useState("");
  return (
    <>
      <button
        className="btn btn-sm btn-warning"
        onClick={() => setShowForm(true)}
      >
        Laporkan matil 🙀
      </button>
      {showForm && (
        <div className="mt-4 border rounded-lg p-4 flex flex-col gap-4">
          {/* <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Judul</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              name="title"
            />
          </label> */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Spill the tea ☕️</span>
            </div>
            <TextEditor
              value={descriptionHtml}
              onChange={setDescriptionHtml}
              withLink
              withList
            />
          </label>
          <div className="flex justify-end items-center">
            <button
              className="btn btn-sm btn-error"
              onClick={() => setShowForm(false)}
            >
              Batal
            </button>
            <button className="btn btn-sm btn-primary ml-2">Kirim</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Accuse;
