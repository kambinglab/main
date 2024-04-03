"use client";

import { FC, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Quill from "quill";
import { UserProfile } from "@prisma/client";
import { User } from "next-auth";
import { CAS_LOGIN_URL } from "@utils/config";
import { useFormState } from "react-dom";
import { accuse } from "./actions";
import toast from "react-hot-toast";
import { useFormStatus } from "react-dom";

const Editor = dynamic(() => import("@components/text-editor"), {
  ssr: false,
});

interface Props {
  profile: UserProfile;
  user?: User;
}

const initialState = {
  success: false,
  message: "",
  data: null,
};

const SubmitButton: FC = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className="btn btn-sm btn-primary ml-2"
      type="submit"
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? "Mengirim..." : "Kirim"}
    </button>
  );
};

const Accuse: FC<Props> = ({ user, profile }) => {
  const [showForm, setShowForm] = useState(false);
  const [delta, setDelta] = useState<any>("");
  const [state, formAction] = useFormState(accuse, initialState);
  const quillRef = useRef<Quill | null>(null);
  const handleClick = () => {
    if (!user) {
      window.location.href = CAS_LOGIN_URL;
    } else {
      setShowForm(true);
    }
  };

  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      toast.success(state.message);
      setDelta("");
      setShowForm(false);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  if (!showForm)
    return (
      <button className="btn btn-sm btn-warning" onClick={handleClick}>
        Laporkan matil 🙀
      </button>
    );
  if (!user) return null;

  return (
    <form className="mt-4 flex flex-col gap-4" action={formAction}>
      <input
        type="hidden"
        name="accused_profile_id"
        value={profile.id}
        readOnly
        aria-readonly
      />
      <input
        type="hidden"
        name="accuser_user_id"
        value={user.id}
        readOnly
        aria-readonly
      />
      <input
        type="hidden"
        name="content"
        value={JSON.stringify(delta)}
        readOnly
        aria-readonly
      />
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Spill the tea ☕️</span>
        </div>
        <Editor
          innerRef={quillRef}
          getDelta={setDelta}
          placeholder="Type here"
          withImage
          withLink
        />
      </label>
      <div className="flex justify-end items-center">
        <button
          className="btn btn-sm btn-error"
          type="reset"
          onClick={() => setShowForm(false)}
        >
          Batal
        </button>
        <SubmitButton />
      </div>
    </form>
  );
};

export default Accuse;
