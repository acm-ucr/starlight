import Providers from "@/components/providers";
import { getSession } from "@/utils/auth";
import ProtectedPage from "@/components/protected";
interface FormProps {
  children: React.ReactNode;
}

const FormLayout = async ({ children }: FormProps) => {
  const session = await getSession();
  return (
    <Providers session={session}>
      <ProtectedPage session={session} restrictions={{ member: ["1"] }}>
        {children}
      </ProtectedPage>
    </Providers>
  );
};

export default FormLayout;
