"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const Landing = () => {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className="p-4">
        <p className="text-xl font-bold">Welcome, {session.user.firstName}!</p>
        <p>Email: {session.user.email}</p>

        <button
          className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">You are not signed in</h1>
      <button
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Landing;
