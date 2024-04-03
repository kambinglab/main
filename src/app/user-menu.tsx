"use client";

import { User } from "next-auth";
import { CAS_LOGIN_URL } from "@utils/config";
import { signOut } from "next-auth/react";

interface Props {
  user?: User;
}

const UserMenu = ({ user }: Props) => {
  if (!user)
    return (
      <div>
        <a href={CAS_LOGIN_URL} className="btn btn-warning btn-sm">
          Masuk dengan SSO UI
        </a>
      </div>
    );

  return (
    <div className="flex items-center gap-3">
      <div className="avatar placeholder">
        <div className="bg-neutral text-neutral-content rounded-full w-8">
          <span className="text-xs">
            {user.sso_id.split(".").map((id) => id.slice(0, 1).toUpperCase())}
          </span>
        </div>
      </div>
      <button className="btn btn-sm btn-primary">My Profile</button>
      <button
        className="btn btn-error btn-sm"
        onClick={() =>
          signOut({
            callbackUrl: "/",
          })
        }
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
