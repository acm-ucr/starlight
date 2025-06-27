import { SearchParams } from "@/types/dashboard";
import Create from "@/components/admin/dashboards/createapplications";
import { parseSearchParams } from "@/utils/parseSearchParams";

export const metadata = {
  title: "Create Applications",
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
  return <Create searchParams={parsedSearchParams} />;
};

export default Page;
