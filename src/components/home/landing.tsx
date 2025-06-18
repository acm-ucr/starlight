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
      <div className="mx-auto grid w-5/6 flex-grow grid-cols-1 items-center md:grid-cols-2">
        <div className="order-2 md:order-1">
          <p className="to-starlight-yellow-primary bg-gradient-to-r from-white to-[70%] bg-clip-text text-center text-6xl font-bold text-transparent md:to-30% md:text-left md:text-7xl">
            ACM
          </p>
          <p className="to-starlight-yellow-primary bg-gradient-to-r from-white to-[70%] bg-clip-text pb-2 text-center text-6xl font-bold text-transparent md:to-30% md:text-left md:text-7xl">
            Starlight
          </p>
          <div className="flex justify-center gap-x-4 pt-4 pb-6 text-6xl text-white md:justify-start">
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
          <p className="text-center text-xl font-bold text-white md:text-left">
            Apply to ACM's Programs below!
          </p>
          {session?.user ? (
            <div className="mt-8 flex justify-center md:justify-start">
              <Link
                className="bg-starlight-blue-primary rounded px-8 py-2 text-2xl text-white hover:cursor-pointer"
                href="/apply"
              >
                Apply
              </Link>
            </div>
          ) : (
            <div className="flex justify-center md:justify-start">
              <button
                className="bg-starlight-blue-primary mt-8 rounded px-8 py-2 text-2xl text-white hover:cursor-pointer"
                onClick={() => signIn("google")}
              >
                Sign In
              </button>
            </div>
          )}
        </div>
        <div className="order-1 flex justify-center md:order-2">
          <Image
            src={Starlight}
            alt="Starlight"
            className="drop-shadow-yellow-primary w-8/12 md:w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
