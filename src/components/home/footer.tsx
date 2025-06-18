import Image from "next/image";
import Link from "next/link";
import Starlight from "@/public/starlight.svg";
import { FaGithub, FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="bg-starlight-gray-primary border-starlight-blue-primary flex flex-col items-center border-t-8 text-3xl text-white">
      <Image
        src={Starlight}
        alt="Starlight"
        className="drop-shadow-yellow-primary w-1/12 pt-12 pb-6"
      />
      <p>ACM @ UCR</p>
      <div className="flex gap-x-4 pt-4 pb-8">
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
  );
};

export default Footer;
