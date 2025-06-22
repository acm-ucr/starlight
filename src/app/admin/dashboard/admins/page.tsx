import { SearchParams } from "@/types/dashboard";
import Admins from "@/components/admin/dashboards/admins";
export const metadata = {
  title: "Admin | Admins",
};

interface searchParamsProps {
  searchParams: SearchParams;
}

const Page = ({ searchParams }: searchParamsProps) => {
  return <Admins searchParams={searchParams} />;
};

export default Page;
