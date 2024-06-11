"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("email", { email, callbackUrl: "/" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8">
        {session ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14">
                <Image
                  src={session.user?.image as string}
                  alt="Logo img"
                  width={1080}
                  height={1080}
                  className="rounded-full"
                />
              </div>

              <div className="flex flex-col items-start leading-[0]">
                <h2 className="text-3xl font-extrabold text-gray-900">
                  {session.user?.name}
                </h2>
                <p className="text-sm text-gray-400">{session.user?.email}</p>
              </div>
            </div>

            <div>
              <button
                onClick={() => signOut()}
                className="group relative mt-4 flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <p>Sign out</p>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-10">
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              You are not signed in
            </h2>

            <div className="flex flex-col items-center justify-center">
              <form
                onSubmit={handleEmailSignIn}
                className="flex min-w-[18rem] flex-col"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg border px-3 py-1 text-lg"
                  placeholder="email@example.com"
                />

                <button
                  type="submit"
                  className="relative mt-4 flex w-full justify-center rounded-md border border-transparent bg-black py-2 text-base font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                >
                  <p>Sign in with Email</p>
                </button>
              </form>

              <div className="my-4 flex min-w-[18rem] items-center justify-center">
                <div className="w-full border-b border-gray-400"></div>
                <h1 className="mx-3 text-gray-400">OR</h1>
                <div className="w-full border-b border-gray-400"></div>
              </div>

              <div className="flex min-w-[18rem] flex-col">
                <button
                  onClick={() => signIn("google")}
                  className="relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <p>Sign in with Google</p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
