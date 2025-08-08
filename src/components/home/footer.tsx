import Image from "next/image";
import Link from "next/link";
import Starlight from "@/public/logos/starlight.svg";
import { FaDiscord, FaGithub, FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-starlight-blue-secondary flex flex-row items-center py-4 text-white">
      <Image src={Starlight} alt="Starlight" className="mx-8 w-16" />
      <p className="mr-8 text-2xl font-bold">Starlight</p>
      <p className="text-lg">© 2025 Starlight. Made with 💙 from Starlight.</p>
      <div className="mr-12 ml-auto flex gap-x-4 text-4xl">
        <Link
          href="https://github.com/acm-ucr"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all hover:scale-105 hover:opacity-90"
        >
          <FaGithub />
        </Link>
        <Link
          href="https://www.linkedin.com/company/acm-ucr"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all hover:scale-105 hover:opacity-90"
        >
          <FaLinkedin />
        </Link>
        <Link
          href="https://discord.gg/ghhbez7A"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all hover:scale-105 hover:opacity-90"
        >
          <FaDiscord />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
