import Providers from "@/components/providers";
import { getSession } from "@/utils/auth";
import ProtectedPage from "@/components/protected";
import { Toaster } from "react-hot-toast";
interface FormProps {
  children: React.ReactNode;
}

const AdminLayout = async ({ children }: FormProps) => {
  const session = await getSession();
  return (
    <Providers session={session}>
      <Toaster />
      <ProtectedPage session={session} restrictions={{ admin: ["1"] }}>
        {children}
      </ProtectedPage>
    </Providers>
  );
};

export default AdminLayout;
