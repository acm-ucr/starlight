"use client";
import { useSession } from "next-auth/react";
import Tracks from "@/components/apply/tracks";
import GoBack from "@/components/apply/goback";
import Navigation from "@/components/home/navigation";

const Page = () => {
  const { data: session } = useSession();
  return (
    <div className="h-screen">
      <Navigation />
      {session?.user ? <Tracks /> : <GoBack />}
    </div>
  );
};

export default Page;
