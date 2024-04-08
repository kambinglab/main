import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { CAS_SERVICE_URL, CAS_VALIDATE_URL } from "./config";
import axios from "axios";
import { parseStringPromise } from "xml2js";

const prismaAdapter = PrismaAdapter(prisma);

const generateSessionToken = () => {
  return randomUUID();
};

const fromDate = (time: number, date = Date.now()) => {
  return new Date(date + time * 1000);
};

export const config = {
  providers: [
    CredentialsProvider({
      name: "sso-ui",
      credentials: {
        ticket: { label: "Ticket", type: "text" },
      },
      async authorize(credentials, req) {
        if (!credentials) throw new Error("No credentials provided");
        const validateUrl = new URL(CAS_VALIDATE_URL);
        validateUrl.searchParams.set("service", CAS_SERVICE_URL);
        validateUrl.searchParams.set("ticket", credentials?.ticket);
        const { data, status } = await axios.get(validateUrl.toString());
        if (status !== 200) throw new Error("Failed to validate ticket");
        const xml = await parseStringPromise(data);
        const serviceResponse = xml["cas:serviceResponse"];
        const authenticationSuccess =
          serviceResponse["cas:authenticationSuccess"];
        if (!authenticationSuccess)
          throw new Error("CAS Authentication Failed");
        const sso_username = authenticationSuccess[0]["cas:user"][0];
        const attributes = authenticationSuccess[0]["cas:attributes"][0];
        const name = attributes["cas:nama"][0];
        const npm = attributes["cas:npm"][0];
        const org_code = attributes["cas:kd_org"][0];
        const user = await prisma.user.upsert({
          where: {
            sso_id: sso_username,
          },
          update: {
            name: name,
            npm: npm,
            org_code: org_code,
          },
          create: {
            sso_id: sso_username,
            name: name,
            npm: npm,
            org_code: org_code,
          },
        });
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: prismaAdapter,
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      session.user.sso_id = user.sso_id;
      session.user.npm = user.npm;
      session.user.org_code = user.org_code;
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (user) {
        const sessionToken = generateSessionToken();
        const sessionExpires = fromDate(60 * 60 * 24 * 7);
        await prismaAdapter?.createSession?.({
          sessionToken,
          expires: sessionExpires,
          userId: user.id,
        });
        cookies().set("next-auth.session-token", sessionToken, {
          httpOnly: true,
          secure: true,
          sameSite: "lax",
          path: "/",
          expires: sessionExpires,
        });
      }
      return true;
    },
  },
  jwt: {
    encode: async (params) => {
      const cookie = cookies().get("next-auth.session-token");
      if (cookie) return cookie.value;
      else return "";
    },
    decode: async (params) => {
      return null;
    },
  },
  // pages: {
  //   signIn: "/login/verify",
  // },
} satisfies NextAuthOptions;

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
