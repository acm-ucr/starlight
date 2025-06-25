import Admins from "@/components/admin/dashboards/admins";
import { parseSearchParams } from "@/utils/parseSearchParams";
import { SearchParams } from "@/types/dashboard";

export const metadata = {
  title: "Admin | Admins",
};

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const Page = ({ searchParams = {} }: PageProps) => {
  const parsedSearchParams: SearchParams = parseSearchParams(searchParams);

  return <Admins searchParams={parsedSearchParams} />;
};

export default Page;
