import Link from "next/link";

const GoBack = () => {
  return (
    <div className="bg-starlight-gray-primary flex h-full flex-col items-center justify-center">
      <p className="pb-4 text-4xl font-bold text-white"> Please Sign In</p>
      <Link
        className="bg-starlight-blue-primary rounded px-8 py-2 text-2xl text-white hover:cursor-pointer"
        href="/"
      >
        Home
      </Link>
    </div>
  );
};

export default GoBack;
