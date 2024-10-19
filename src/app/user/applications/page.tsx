import Protected from "@/components/global/protected";
import Apply from "@/components/user/applications/apply";

const Page = () => {
  return (
    <Protected>
      <Apply />
    </Protected>
  );
};

export default Page;
