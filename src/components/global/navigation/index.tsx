import Link from "next/link";

const Navigation = () => {
  return (
    <div className="flex gap-4 bg-starlight-blue text-white">
      <Link href="/user/applications">Applications</Link>
      <Link href="/user/profile">Profile</Link>
    </div>
  );
};

export default Navigation;
