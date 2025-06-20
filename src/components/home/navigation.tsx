"use client";
import Image from "next/image";
import Starlight from "@/public/logos/starlight.svg";
import Link from "next/link";
const Navigation = () => {
  return (
    <div className="bg-starlight-gray-primary flex text-white">
      <Link href="/">
        <Image
          src={Starlight}
          alt="Starlight"
          className="drop-shadow-yellow-secondary w-20 py-4 pl-4"
        />
      </Link>
      <div className="flex w-full items-center justify-end">
        <Link
          href="/apply"
          className="bg-starlight-blue-primary mr-8 rounded-lg px-2 py-2 font-bold"
        >
          Apply Now!
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
