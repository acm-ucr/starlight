import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="rounded-md bg-blue-900 px-8 py-2 font-serif text-[vw] text-white"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
