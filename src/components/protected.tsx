import RELEASES from "@/data/releases";
import Fault from "@/utils/error";
import { headers } from "next/headers";
import SignIn from "@/utils/signin";
import { Session as SessionType } from "next-auth";
import Navigation from "@/components/navigation";
import { SidebarProvider } from "./ui/sidebar";
interface ProtectedPageProps {
  children: React.ReactNode;
  restrictions: Record<string, number[]>;
  session: SessionType | null;
}

const ProtectedPage = async ({
  children,
  restrictions,
  session,
}: ProtectedPageProps) => {
  const header = await headers();
  const pathName = header.get("x-url") || "";

  if (!session) {
    return <SignIn callback={pathName} />;
  }

  if (RELEASES[pathName] > new Date()) {
    throw new Fault(
      423,
      "Locked Resource",
      "This resource has not been released",
    );
  }
  if (!session.user.roles && Object.keys(restrictions).length > 0) {
    throw new Fault(403, "Unauthorized", "You do not have any assigned roles");
  }

  const authorized = Object.entries(restrictions).some(([key, values]) =>
    Array.isArray(values)
      ? values.includes(session.user.roles[key])
      : session.user.roles[key] === values,
  );

  if (!authorized && Object.keys(restrictions).length > 0) {
    throw new Fault(403, "Unauthorized", "You do not have access to this page");
  }

  const navigation = RegExp(/user\/|admin\//).test(pathName);

  return (
    <div className="flex">
      {navigation && (
        <SidebarProvider>
          <Navigation />
        </SidebarProvider>
      )}
      {children}
    </div>
  );
};

export default ProtectedPage;
