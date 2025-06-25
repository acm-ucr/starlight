import RELEASES from "@/data/releases";
import Fault from "@/utils/error";
import { headers } from "next/headers";
import SignIn from "@/utils/signin";
import { Session as SessionType } from "next-auth";
import Navigation from "@/components/navigation";
import { SidebarProvider } from "./ui/sidebar";
interface ProtectedPageProps {
  children: React.ReactNode;
  restrictions: Record<string, string[]>;
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

  const authorized = Object.entries(restrictions).some(
    ([key, allowedValues]) => {
      const userRole = session.user.roles?.[key];
      if (Array.isArray(userRole)) {
        return userRole.some((role) => allowedValues.includes(role));
      }
      return allowedValues.includes(userRole ?? "");
    },
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
