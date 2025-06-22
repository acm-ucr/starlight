import Providers from "@/components/providers";
import { getSession } from "@/utils/auth";
import ProtectedPage from "@/components/protected";
interface FormProps {
  children: React.ReactNode;
}

const AdminLayout = async ({ children }: FormProps) => {
  const session = await getSession();
  return (
    <Providers session={session}>
      <ProtectedPage session={session} restrictions={{ admin: [1] }}>
        {children}
      </ProtectedPage>
    </Providers>
  );
};

export default AdminLayout;
