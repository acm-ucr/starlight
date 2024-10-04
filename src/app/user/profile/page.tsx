import Protected from "@/components/Protected";
import Profile from "@/components/user/Profile";

const Page = () => {
  return (
    <Protected>
      <Profile />
    </Protected>
  );
};

export default Page;
