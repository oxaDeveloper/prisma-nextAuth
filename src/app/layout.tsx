import "../styles/globals.css";
import { ReactNode } from "react";
import { Session } from "next-auth";
import ClientSessionProvider from "./ClientSessionProvider";

interface RootLayoutProps {
  children: ReactNode;
  session: Session | null;
}

export default function RootLayout({ children, session }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body>
        <ClientSessionProvider session={session}>
          {children}
        </ClientSessionProvider>
      </body>
    </html>
  );
}
