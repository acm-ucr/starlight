"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Starlight from "@/public/starlight.svg";

const Navigation = () => {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className="bg-starlight-gray-primary flex text-white">
        <Image
          src={Starlight}
          alt="Starlight"
          className="drop-shadow-yellow-secondary w-20 py-4 pl-4"
        />
        <div className="flex w-full items-center justify-end">
          <button
            onClick={() => signOut()}
            className="pr-8 font-bold hover:cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-starlight-gray-primary sticky flex text-white">
      <Image
        src={Starlight}
        alt="Starlight"
        className="drop-shadow-yellow-secondary w-20 py-4 pl-4"
      />
      <div className="flex w-full items-center justify-end">
        <button
          onClick={() => signIn("google")}
          className="pr-8 font-bold hover:cursor-pointer"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Navigation;
