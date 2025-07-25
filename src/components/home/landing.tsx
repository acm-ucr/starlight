"use client";
import Image from "next/image";
import Starlight from "@/public/logos/starlight.svg";
import Navigation from "./navigation";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Landing = () => {
  return (
    <div className="flex h-screen flex-col">
      <Navigation />
      <div className="mx-auto grid w-5/6 flex-grow grid-cols-1 items-center md:grid-cols-2">
        <div className="order-2 md:order-1">
          <p className="font-league to-starlight-yellow-primary bg-gradient-to-r from-white to-60% bg-clip-text pb-8 text-center text-6xl font-bold text-transparent md:text-left md:text-8xl">
            ACM Starlight
          </p>
          <p className="to-starlight-yellow-primary bg-gradient-to-r from-white to-[70%] bg-clip-text pb-2 text-center text-6xl font-bold text-transparent md:to-30% md:text-left md:text-7xl"></p>
          <p className="text-center text-xl font-light text-white md:text-left">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet{" "}
            <span className="to-starlight-spark/80 from-starlight-yellow-primary bg-white bg-gradient-to-r to-80% bg-clip-text font-semibold text-transparent">
              consectetur
            </span>{" "}
            adipiscing elit quisque faucibus ex. Adipiscing elit quisque
            faucibus ex sapien vitae pellentesque.
          </p>
          <div className="mt-8 flex flex-row items-center gap-8">
            <Link
              className="bg-starlight-yellow-primary text-starlight-blue-primary rounded-lg px-10 py-3 text-2xl font-bold text-nowrap hover:cursor-pointer"
              href="/apply"
            >
              Sign In
            </Link>
            <p className="text-white">
              Curious to learn more? Check out our socials!
            </p>
            <div className="flex justify-center gap-x-4 text-6xl text-white">
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
          </div>
        </div>
        <div className="order-1 flex justify-center md:order-2">
          <Image
            src={Starlight}
            alt="Starlight"
            className="drop-shadow-yellow-primary w-8/12 md:w-1/3"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
