import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { NextApiHandler } from "next";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "~/server/db";
import { Adapter } from "next-auth/adapters";

const authHandler: NextApiHandler = NextAuth({
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST!,
        port: process.env.EMAIL_SERVER_PORT!,
        auth: {
          user: process.env.EMAIL_SERVER_USER!,
          pass: process.env.EMAIL_SERVER_PASSWORD!,
        },
      },
      from: process.env.EMAIL_FROM!,
    }),
  ],
  adapter: PrismaAdapter(db) as Adapter,
  pages: {
    signIn: "/",
    verifyRequest: "/verify-request",
    error: "/error",
  },
});

export { authHandler as GET, authHandler as POST };
