import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultSession["user"] {
    sso_id: string;
    npm: string | null;
    org_code: string | null;
  }

  interface Session {
    user: User;
  }

  interface Profile extends DefaultProfile {
    screen_name: string | null;
  }
}
