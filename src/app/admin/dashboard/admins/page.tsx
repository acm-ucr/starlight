import { SearchParams } from "@/types/dashboard";
import Admins from "@/components/admin/dashboards/admins";
import { parseSearchParams } from "@/utils/parseSearchParams";

export const metadata = {
  title: "Admin | Admins",
};

interface RawSearchParams {
  [key: string]: string | string[] | undefined;
}

interface PageProps {
  searchParams?: Promise<RawSearchParams>;
}

const Page = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams: RawSearchParams = searchParams
    ? await searchParams
    : {};
  const parsedSearchParams: SearchParams =
    parseSearchParams(resolvedSearchParams);
  return <Admins searchParams={parsedSearchParams} />;
};

export default Page;
