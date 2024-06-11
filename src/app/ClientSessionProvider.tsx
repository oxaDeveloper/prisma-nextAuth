"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface ClientSessionProviderProps {
  children: ReactNode;
  session: Session | null;
}

export default function ClientSessionProvider({
  children,
  session,
}: ClientSessionProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
