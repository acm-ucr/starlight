import Protected from "@/components/global/protected";
import Profile from "@/components/user/profile/profile";

const Page = () => {
  return (
    <Protected>
      <Profile />
    </Protected>
  );
};

export default Page;
