import Link from "next/link";
import React from "react";

interface ButtonProps {
  text: string;
  link: string;
}

const Button = ({ text, link }: ButtonProps) => {
  return (
    <div className="rounded-md bg-blue-900 px-8 py-2 font-serif text-[vw] text-white">
      <Link href={link}> {text} </Link>
    </div>
  );
};

export default Button;
