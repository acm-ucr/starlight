"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Starlight from "@/public/logos/starlight.svg";
import Navigation from "./navigation";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Landing = () => {
  const { data: session } = useSession();

  return (
    <div className="flex h-screen flex-col">
      <Navigation />
      <div className="mx-auto grid w-5/6 flex-grow grid-cols-2 items-center">
        <div>
          <p className="to-starlight-yellow-primary bg-gradient-to-r from-white to-30% bg-clip-text text-7xl font-bold text-transparent">
            ACM
          </p>
          <p className="to-starlight-yellow-primary bg-gradient-to-r from-white to-30% bg-clip-text pb-2 text-7xl font-bold text-transparent">
            Starlight
          </p>
          <div className="flex gap-x-4 pt-4 pb-6 text-6xl text-white">
            <Link
              href="https://github.com/acm-ucr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </Link>
            <Link
              href="https://www.linkedin.com/company/acm-ucr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </Link>
          </div>
          <p className="text-xl font-bold text-white">
            Apply to ACM's Programs below!
          </p>
          {session?.user ? (
            <div className="mt-8">
              <Link
                className="bg-starlight-blue-primary rounded px-8 py-2 text-2xl text-white hover:cursor-pointer"
                href="/apply"
              >
                Apply
              </Link>
            </div>
          ) : (
            <button
              className="bg-starlight-blue-primary mt-8 rounded px-8 py-2 text-2xl text-white hover:cursor-pointer"
              onClick={() => signIn("google")}
            >
              Sign In
            </button>
          )}
        </div>
        <div className="flex justify-center">
          <Image
            src={Starlight}
            alt="Starlight"
            className="drop-shadow-yellow-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
